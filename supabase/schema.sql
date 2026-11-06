-- Pokédex Violet · esquema do banco no Supabase
-- Cole este arquivo inteiro em: Supabase > SQL Editor > New query > Run.
-- Pode ser executado mais de uma vez sem perder dados.

create table if not exists public.pokedex_progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null,                      -- progresso (mesmo formato do backup JSON, versão 4)
  history    jsonb not null default '[]'::jsonb,  -- últimas 100 alterações
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pokedex_progress_data_format check (
    jsonb_typeof(data) = 'object'
    and data->>'format' = 'paldea-boxes'
    and data->>'pokedex' = 'paldea'
  ),
  constraint pokedex_progress_history_array check (jsonb_typeof(history) = 'array'),
  constraint pokedex_progress_size check (pg_column_size(data) + pg_column_size(history) < 2000000)
);

comment on table public.pokedex_progress is 'Progresso da Pokédex de Paldea, uma linha por usuário.';

-- updated_at sempre definido pelo servidor
create or replace function public.pokedex_touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists pokedex_progress_touch on public.pokedex_progress;
create trigger pokedex_progress_touch
  before insert or update on public.pokedex_progress
  for each row execute function public.pokedex_touch_updated_at();

-- Segurança: cada pessoa só enxerga e altera a própria linha.
alter table public.pokedex_progress enable row level security;

drop policy if exists "progresso: ler o próprio"      on public.pokedex_progress;
drop policy if exists "progresso: criar o próprio"    on public.pokedex_progress;
drop policy if exists "progresso: alterar o próprio"  on public.pokedex_progress;
drop policy if exists "progresso: apagar o próprio"   on public.pokedex_progress;

create policy "progresso: ler o próprio" on public.pokedex_progress
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "progresso: criar o próprio" on public.pokedex_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "progresso: alterar o próprio" on public.pokedex_progress
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "progresso: apagar o próprio" on public.pokedex_progress
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Visitantes sem login não têm acesso nenhum.
revoke all on public.pokedex_progress from anon;
grant select, insert, update, delete on public.pokedex_progress to authenticated;

