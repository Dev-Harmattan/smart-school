//sidebar togge implementation
let sidebarOpen =  false;
let sidebar = document.getElementById('sidebar');
let navIcon = document.getElementById('sidebarIcon');

function toggleSidebar() {
  if(!sidebarOpen){
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen){
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}




