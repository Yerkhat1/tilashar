/* =====================================================================
   Tілашар — backend switch.

   EMPTY = the app runs on this device (localStorage). Fill both values and
   it runs on Supabase: real accounts, progress synced across devices.
   Nothing else in the app changes.

   Where to get them:  Supabase dashboard -> Project Settings -> API
     url      = "Project URL"
     anonKey  = "anon / public" key

   The anon key is MEANT to be public — it is in every Supabase web app.
   Row Level Security in schema.sql is what actually protects the data:
   content is world-readable, and each learner can only touch their own
   rows. Never put the service_role key here.
   ===================================================================== */
window.SUPABASE = {
  url: "",
  anonKey: "",
};
