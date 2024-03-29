#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn greet(name: &str) -> String {
   format!("Hello, {}!", name)
}


fn main() {

  tauri::Builder::default()
  .plugin(tauri_plugin_sql::Builder::default().build())
  .invoke_handler(tauri::generate_handler![greet])
  .run(tauri::generate_context!())
  .expect("error while running tauri application");

}





