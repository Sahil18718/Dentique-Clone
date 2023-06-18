let nav  = document.getElementById("nav");
nav.innerHTML=` <div class="logo">
<a href="../index.html">
<img src="../images/dentique-logo-web-8f7226ed.png" alt="Logo"></a>
<!-- <h2 style="color: #000;">My Website</h2> -->
</div>
<div class="navbar-inner"></div>
<ul>
<li><a href="../pages/doctors.html">Doctors</a></li>
<li><a id="appointments" href="../pages/myappointments.html">Appointments</a></li>
<li class="dropdown">
<a href="#">Login</a>
<div class="dropdown-content">
  <a href="../patients/html/login.html">User Login</a>
  <a href="../doctor/html/login.html">Doctor Login</a>
  <a href="../admin/html/login.html">Admin Login</a>
</div>
</li>
<li><a href="#" onclick="logout()" class="logout-link">Logout</a></li>
</ul>`

let footer = document.getElementById("footer");
function logout(){
  localStorage.removeItem("token")
  swal.fire({
    title : "logout successfull",
    icon:"success"
  }).then((result)=>{
    if(result.isConfirmed=="true"){window.location.href="../index.html"}
  })
}