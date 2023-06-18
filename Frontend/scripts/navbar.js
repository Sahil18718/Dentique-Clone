let nav  = document.getElementById("nav");
nav.innerHTML=` <div class="logo">
<a href="./index.html">
<img src="../images/dentique-logo-web-8f7226ed.png" alt="Logo"></a>
<!-- <h2 style="color: #000;">My Website</h2> -->
</div>
<div class="navbar-inner"></div>
<ul>
<li><a href="./pages/doctors.html">Doctors</a></li>
<li class="dropdown">
<a href="#">Login</a>
<div class="dropdown-content">
  <a href="./patients/html/login.html">User Login</a>
  <a href="./doctor/html/login.html">Doctor Login</a>
  <a href="./admin/html/login.html">Admin Login</a>
</div>
</li>
<li><a href="#" class="logout-link">Logout</a></li>
</ul>`

let footer = document.getElementById("footer");
