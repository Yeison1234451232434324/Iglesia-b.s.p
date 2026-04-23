import { createClient } from '@supabase/supabase-js'

// REEMPLAZA estos valores con los que aparecen en tu Dashboard de Supabase (Settings > API)
const supabaseUrl = 'https://jjpbmkydbdbqlynvqvcj.supabase.co'
const supabaseAnonKey = 'sb_publishable_rqa2Vg-DBPqVvKoypRbJ5g_V5sDg_LW'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)