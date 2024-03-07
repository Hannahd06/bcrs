"use strict";(self.webpackChunkbcrs=self.webpackChunkbcrs||[]).push([[943],{8943:(G,f,d)=>{d.r(f),d.d(f,{AdminModule:()=>j});var u=d(6814),i=d(9310),g=d(9862),e=d(4946);let _=(()=>{var t;class a{}return(t=a).\u0275fac=function(r){return new(r||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-admin"]],decls:1,vars:0,template:function(r,o){1&r&&e._UZ(0,"router-outlet")},dependencies:[i.lC],encapsulation:2}),a})(),p=(()=>{var t;class a{login(r){throw new Error("Method not implemented.")}constructor(r){this.http=r}updateUser(r,o){return console.log("api/users/"+r+"/update"),this.http.put("api/users/"+r,{user:o})}getUsers(){return this.http.get("/api/users")}getUser(r){return this.http.get("/api/users/"+r)}deleteUser(r){return this.http.delete(`/api/users/${r}`)}createNewUser(r){return this.http.post("api/users",{user:r})}}return(t=a).\u0275fac=function(r){return new(r||t)(e.LFG(g.eN))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),a})();function U(t,a){if(1&t){const n=e.EpF();e.TgZ(0,"tbody")(1,"tr")(2,"td"),e._uU(3),e.qZA(),e.TgZ(4,"td"),e._uU(5),e.qZA(),e.TgZ(6,"td"),e._uU(7),e.qZA(),e.TgZ(8,"td"),e._uU(9),e.qZA(),e.TgZ(10,"td"),e._uU(11),e.qZA(),e.TgZ(12,"td")(13,"button",6)(14,"span",7),e._uU(15,"edit"),e.qZA()()(),e.TgZ(16,"td")(17,"button",8),e.NdJ("click",function(){const l=e.CHM(n).$implicit,c=e.oxw();return e.KtG(c.deleteUser(l.empId))}),e.TgZ(18,"span",7),e._uU(19,"delete"),e.qZA()()()()()}if(2&t){const n=a.$implicit;e.xp6(3),e.Oqu(n.empId),e.xp6(2),e.Oqu(n.email),e.xp6(2),e.Oqu(n.firstName),e.xp6(2),e.Oqu(n.lastName),e.xp6(2),e.Oqu(n.role),e.xp6(2),e.MGl("routerLink","/admin/users/",n.empId,"/update")}}let h=(()=>{var t;class a{constructor(r){this.userService=r,this.userData=[],this.errorMessage="",this.userService.getUsers().subscribe({next:o=>{console.log("List of users:",this.userData),this.userData=o},error:o=>{this.errorMessage=o.message},complete:()=>{}})}deleteUser(r){if(void 0!==r){if(!confirm("Are you sure you want to disable user with empID"+r+"?"))return;console.log("Disabling user:",r),this.userService.deleteUser(r).subscribe({next:o=>{this.userData=this.userData.filter(l=>l.empId!==r),console.log("result:",o)},error:o=>{console.error("error:",o)}})}else console.error("User ID is undefined")}}return(t=a).\u0275fac=function(r){return new(r||t)(e.Y36(p))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-user-list"]],decls:25,vars:1,consts:[[1,"config-container"],[1,"row","justify-content-center","mt-5","text-center"],[1,"user-table","row","justify-content-center"],[1,"darkTable"],[4,"ngFor","ngForOf"],["routerLink","/admin/users/new",1,"btn","btn-lg","button-home","create-button"],[1,"btn",3,"routerLink"],[1,"material-icons"],[1,"btn",3,"click"]],template:function(r,o){1&r&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h1"),e._uU(3,"User Configuration"),e.qZA(),e.TgZ(4,"div",2)(5,"table",3)(6,"thead")(7,"tr")(8,"th"),e._uU(9,"ID"),e.qZA(),e.TgZ(10,"th"),e._uU(11,"Email"),e.qZA(),e.TgZ(12,"th"),e._uU(13,"First Name"),e.qZA(),e.TgZ(14,"th"),e._uU(15,"Last Name"),e.qZA(),e.TgZ(16,"th"),e._uU(17,"Role"),e.qZA(),e.TgZ(18,"th"),e._uU(19,"Edit"),e.qZA(),e.TgZ(20,"th"),e._uU(21,"Delete"),e.qZA()()(),e.YNc(22,U,20,6,"tbody",4),e.qZA()()(),e.TgZ(23,"button",5),e._uU(24,"+ CREATE USER"),e.qZA()()),2&r&&(e.xp6(22),e.Q6J("ngForOf",o.userData))},dependencies:[u.sg,i.rH],styles:[".config-container[_ngcontent-%COMP%]{margin-top:3%;min-height:70vh}h1[_ngcontent-%COMP%]{color:#fff09a;font-size:56px}table.darkTable[_ngcontent-%COMP%]{font-family:Ubuntu,sans-serif;border:dashed rgb(241,197,20) 5px;background-color:#7f7e7d;width:75%;text-align:center;border-collapse:collapse;margin-top:2%}table.darkTable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], table.darkTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{border:2px solid #4A4A4A;padding:15px}table.darkTable[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:16px;color:#fff09a}table.darkTable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background:#888888}table.darkTable[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{background:#372E29;border-bottom:3px solid #000000}table.darkTable[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-size:15px;font-weight:700;color:#fff09a;text-align:center;border-left:2px solid #4A4A4A}table.darkTable[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{border-left:none}table.darkTable[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:12px}.btn[_ngcontent-%COMP%]{color:#fff09a}.button-home[_ngcontent-%COMP%]{margin-left:12%;font-weight:600;font-size:30px;margin-top:3%;background-color:#eeba35;font-family:Teko,sans-serif;color:#000}"]}),a})();var s=d(95);function Z(t,a){if(1&t&&(e.TgZ(0,"div",36),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.hij(" ",n.errorMessage," ")}}function b(t,a){if(1&t&&(e.TgZ(0,"div",37),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.hij(" ",n.successMessage," ")}}function v(t,a){1&t&&(e.TgZ(0,"div")(1,"div",38)(2,"strong"),e._uU(3,"Email is Required!"),e.qZA(),e._UZ(4,"button",39),e.qZA()())}function N(t,a){1&t&&(e.TgZ(0,"div")(1,"div",40)(2,"strong"),e._uU(3,"Please enter a valid email!"),e.qZA(),e._UZ(4,"button",39),e.qZA()())}function q(t,a){1&t&&(e.TgZ(0,"div")(1,"div",40)(2,"strong"),e._uU(3," First Name is required!"),e.qZA(),e._UZ(4,"button",39),e.qZA()())}function A(t,a){1&t&&(e.TgZ(0,"div")(1,"div",40)(2,"strong"),e._uU(3,"Last Name is required!"),e.qZA(),e._UZ(4,"button",39),e.qZA()())}function w(t,a){1&t&&(e.TgZ(0,"div")(1,"div",40)(2,"strong"),e._uU(3,"Address is required!"),e.qZA(),e._UZ(4,"button",39),e.qZA()())}function C(t,a){1&t&&(e.TgZ(0,"div")(1,"div",40)(2,"strong"),e._uU(3,"Phone Number is required!"),e.qZA(),e._UZ(4,"button",39),e.qZA()())}function T(t,a){1&t&&(e.TgZ(0,"div")(1,"div",40)(2,"strong"),e._uU(3,"Phone number must only contain numbers!"),e.qZA(),e._UZ(4,"button",39),e.qZA()())}function x(t,a){1&t&&(e.TgZ(0,"div")(1,"div",40)(2,"strong"),e._uU(3,"Please select a role!"),e.qZA(),e._UZ(4,"button",39),e.qZA()())}let F=(()=>{var t;class a{constructor(r,o,l,c){this.route=r,this.userService=o,this.router=l,this.fb=c,this.updateUserForm=this.fb.group({email:[null,s.kI.compose([s.kI.required,s.kI.email])],firstName:[null,s.kI.required],lastName:[null,s.kI.required],address:[null,s.kI.required],phoneNumber:[null,s.kI.compose([s.kI.required,s.kI.pattern("^[0-9]*$")])],role:[null,s.kI.required]}),this.user={};let B=this.route.snapshot.paramMap.get("empId")||"";this.empId=parseInt(B,10),this.errorMessage="",this.successMessage="",this.userService.getUser(this.empId).subscribe({next:m=>{this.user=m,console.log(this.user)},error:m=>{console.log("error",m),this.errorMessage=m.message},complete:()=>{this.updateUserForm.controls.email.setValue(this.user.email),this.updateUserForm.controls.firstName.setValue(this.user.firstName),this.updateUserForm.controls.lastName.setValue(this.user.lastName),this.updateUserForm.controls.address.setValue(this.user.address),this.updateUserForm.controls.phoneNumber.setValue(this.user.phoneNumber),this.updateUserForm.controls.role.setValue(this.user.role)}})}updateUser(){let r={};r.email=this.updateUserForm.controls.email.value,r.firstName=this.updateUserForm.controls.firstName.value,r.lastName=this.updateUserForm.controls.lastName.value,r.address=this.updateUserForm.controls.address.value,r.phoneNumber=this.updateUserForm.controls.phoneNumber.value,r.role=this.updateUserForm.controls.role.value,this.userService.updateUser(this.empId,r).subscribe({next:o=>{console.log(o),this.successMessage="User has been updated successfully",this.router.navigate(["/admin/users"]),console.log(this.successMessage)},error:o=>{console.log("error",o),this.errorMessage=o.message,(o=new Error("Unable to update user record for empId"+this.empId))&&(this.errorMessage="User information was not changed!"),this.hideAlert()}})}hideAlert(){setTimeout(()=>{this.errorMessage="",this.successMessage=""},5e3)}}return(t=a).\u0275fac=function(r){return new(r||t)(e.Y36(i.gz),e.Y36(p),e.Y36(i.F0),e.Y36(s.qu))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-update-user"]],decls:64,vars:12,consts:[[1,"container-fluid","pt-5"],[1,"row","justify-content-center"],[1,"update-container","col-lg-6","col-md-10","col-sm-12"],[1,"card"],[1,"card-title","pt-5"],[1,"justify-content-center","pt-4"],[1,"col-sml-10","col-mid-8","col-lg-6>"],[1,"col-sm-6","text-align","w-50","mx-auto",2,"margin","auto"],["class","justify-content-center","ngClass","alert alert-info","role","alert",4,"ngIf"],[1,"col-sm-6","text-align",2,"margin","auto"],["class","justify-content-center","class"," alert alert-success","role","alert",4,"ngIf"],[1,"m-5"],[3,"formGroup","ngSubmit"],[1,"form-group"],[1,"row","d-grid","form-content"],[4,"ngIf"],[1,"col-12","my-3","w-75","text"],["for","firstName"],["id","email","type","text","formControlName","email",1,"form-control"],["id","firstName","type","text","formControlName","firstName",1,"form-control"],[1,"col-12","my-3","w-75"],["for","lastName"],["id","lastName","type","text","formControlName","lastName",1,"form-control"],["for","address"],["id","address","type","text","formControlName","address",1,"form-control"],["for","phoneNumber"],["id","phoneNumber","type","text","formControlName","phoneNumber",1,"form-control"],[1,"col-12","my-3","mb-3","w-50","pb-3"],["for","role"],["name","role","id","role","formControlName","role",1,"form-select"],["value","","disabled",""],["value","admin"],["value","standard"],[1,"row","w-50","text-align","mx-auto","pt-3"],["id","submit","value","submit",1,"btn","button-home","mx-auto",3,"disabled"],["routerLink","/admin/users",1,"return-btn"],["ngClass","alert alert-info","role","alert",1,"justify-content-center"],["role","alert",1,"alert","alert-success"],["role","alert",1,"alert","alert-danger","alert-dismissible","fade","show","mx-auto","w-50","text-align"],["type","button","data-bs-dismiss","alert","aria-label","Close",1,"btn","btn-close"],["role","alert",1,"alert","alert-danger","alert-dismissible","fade","show","mx-auto","text-align","w-50"]],template:function(r,o){1&r&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h2"),e._uU(6,"Update User Information"),e.qZA()(),e.TgZ(7,"div",5)(8,"div",6)(9,"div",7),e.YNc(10,Z,2,1,"div",8),e.qZA(),e.TgZ(11,"div",9),e.YNc(12,b,2,1,"div",10),e.qZA()()(),e.TgZ(13,"div",11)(14,"form",12),e.NdJ("ngSubmit",function(){return o.updateUser()}),e.TgZ(15,"fieldset",13)(16,"legend"),e._uU(17,"Please fill out the information below"),e.qZA(),e.TgZ(18,"div",14),e.YNc(19,v,5,0,"div",15),e.YNc(20,N,5,0,"div",15),e.TgZ(21,"div",16)(22,"label",17),e._uU(23,"email"),e.qZA(),e._UZ(24,"input",18),e.qZA(),e.YNc(25,q,5,0,"div",15),e.TgZ(26,"div",16)(27,"label",17),e._uU(28,"First Name"),e.qZA(),e._UZ(29,"input",19),e.qZA(),e.YNc(30,A,5,0,"div",15),e.TgZ(31,"div",20)(32,"label",21),e._uU(33,"Last Name"),e.qZA(),e._UZ(34,"input",22),e.qZA(),e.YNc(35,w,5,0,"div",15),e.TgZ(36,"div",16)(37,"label",23),e._uU(38,"Address"),e.qZA(),e._UZ(39,"input",24),e.qZA(),e.YNc(40,C,5,0,"div",15),e.YNc(41,T,5,0,"div",15),e.TgZ(42,"div",16)(43,"label",25),e._uU(44,"Phone"),e.qZA(),e._UZ(45,"input",26),e.qZA(),e.YNc(46,x,5,0,"div",15),e.TgZ(47,"div",27)(48,"label",28),e._uU(49,"Role"),e.qZA(),e._UZ(50,"br"),e.TgZ(51,"select",29)(52,"option",30),e._uU(53,"select a role"),e.qZA(),e.TgZ(54,"option",31),e._uU(55," Admin "),e.qZA(),e.TgZ(56,"option",32),e._uU(57,"Standard"),e.qZA()(),e._UZ(58,"br"),e.qZA()()(),e.TgZ(59,"div",33)(60,"button",34),e._uU(61,"UPDATE USER"),e.qZA()()()()(),e.TgZ(62,"a",35),e._uU(63,"Return"),e.qZA()()()()),2&r&&(e.xp6(10),e.Q6J("ngIf",o.errorMessage),e.xp6(2),e.Q6J("ngIf",o.successMessage),e.xp6(2),e.Q6J("formGroup",o.updateUserForm),e.xp6(5),e.Q6J("ngIf",o.updateUserForm.controls.email.touched&&o.updateUserForm.controls.email.hasError("required")),e.xp6(1),e.Q6J("ngIf",o.updateUserForm.controls.email.touched&&o.updateUserForm.controls.email.hasError("email")),e.xp6(5),e.Q6J("ngIf",o.updateUserForm.controls.firstName.touched&&o.updateUserForm.controls.firstName.hasError("required")),e.xp6(5),e.Q6J("ngIf",o.updateUserForm.controls.lastName.touched&&o.updateUserForm.controls.lastName.hasError("required")),e.xp6(5),e.Q6J("ngIf",o.updateUserForm.controls.address.touched&&o.updateUserForm.controls.address.hasError("required")),e.xp6(5),e.Q6J("ngIf",o.updateUserForm.controls.phoneNumber.touched&&o.updateUserForm.controls.phoneNumber.hasError("required")),e.xp6(1),e.Q6J("ngIf",o.updateUserForm.controls.phoneNumber.touched&&o.updateUserForm.controls.phoneNumber.hasError("pattern")),e.xp6(5),e.Q6J("ngIf",o.updateUserForm.controls.role.touched&&o.updateUserForm.controls.role.hasError("required")),e.xp6(14),e.Q6J("disabled",!o.updateUserForm.valid))},dependencies:[u.mk,u.O5,i.rH,s._Y,s.YN,s.Kr,s.Fj,s.EJ,s.JJ,s.JL,s.sg,s.u],styles:[".update-container[_ngcontent-%COMP%]{margin:5%}.card[_ngcontent-%COMP%]{color:#fff;background-color:#7f7e7d;border:dashed 5px #EEBA35}h2[_ngcontent-%COMP%]{font-weight:500;font-size:50px}h2[_ngcontent-%COMP%], legend[_ngcontent-%COMP%]{color:#fff092;text-align:center}.col-12[_ngcontent-%COMP%]{margin-left:10%}.button-home[_ngcontent-%COMP%]{text-align:center;font-weight:600;font-size:30px;background-color:#eeba35;font-family:Teko,sans-serif}.return-btn[_ngcontent-%COMP%]{color:#fff}.return-btn[_ngcontent-%COMP%]:hover{background-color:#eeba35;color:#000;padding:10px}"]}),a})();function M(t,a){1&t&&(e.TgZ(0,"div")(1,"div",26)(2,"strong"),e._uU(3,"Please enter a valid employee ID!"),e.qZA(),e._UZ(4,"button",27),e.qZA()())}function I(t,a){1&t&&(e.TgZ(0,"div")(1,"div",26)(2,"strong"),e._uU(3,"Please enter a valid email!"),e.qZA(),e._UZ(4,"button",27),e.qZA()())}function k(t,a){1&t&&(e.TgZ(0,"div")(1,"div",26)(2,"strong"),e._uU(3,"Please enter a valid password!"),e.qZA(),e._UZ(4,"button",27),e.qZA()())}function y(t,a){1&t&&(e.TgZ(0,"div")(1,"div",26)(2,"strong"),e._uU(3,"Password must be at least 8 characters long and contain at a minimum on one upper case, one lower case, and number!"),e.qZA(),e._UZ(4,"button",27),e.qZA()())}function P(t,a){1&t&&(e.TgZ(0,"div")(1,"div",26)(2,"strong"),e._uU(3,"Please select a role for new user!"),e.qZA(),e._UZ(4,"button",27),e.qZA()())}function O(t,a){if(1&t){const n=e.EpF();e.TgZ(0,"div"),e.YNc(1,M,5,0,"div",9),e.TgZ(2,"div",11)(3,"label",12),e._uU(4,"Employee ID"),e.qZA(),e._UZ(5,"input",13),e.qZA(),e.YNc(6,I,5,0,"div",9),e.TgZ(7,"div",11)(8,"label",14),e._uU(9,"Email"),e.qZA(),e._UZ(10,"input",15),e.qZA(),e.YNc(11,k,5,0,"div",9),e.YNc(12,y,5,0,"div",9),e.TgZ(13,"div",11)(14,"label",16),e._uU(15,"Password"),e.qZA(),e._UZ(16,"input",17),e.qZA(),e.YNc(17,P,5,0,"div",9),e.TgZ(18,"div",18)(19,"label",19),e._uU(20,"Role"),e.qZA(),e._UZ(21,"br"),e.TgZ(22,"select",20)(23,"option",21),e._uU(24,"select a role"),e.qZA(),e.TgZ(25,"option",22),e._uU(26," Admin "),e.qZA(),e.TgZ(27,"option",23),e._uU(28,"Standard"),e.qZA()()(),e.TgZ(29,"div",24)(30,"button",25),e.NdJ("click",function(){e.CHM(n);const o=e.oxw();return e.KtG(o.next("personalInfo"))}),e._uU(31," Continue "),e.qZA()()()}if(2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.createNewUserForm.controls.empId.touched&&n.createNewUserForm.controls.empId.hasError("required")),e.xp6(5),e.Q6J("ngIf",n.createNewUserForm.controls.email.touched&&n.createNewUserForm.controls.email.hasError("required")),e.xp6(5),e.Q6J("ngIf",n.createNewUserForm.controls.password.touched&&n.createNewUserForm.controls.password.hasError("required")),e.xp6(1),e.Q6J("ngIf",n.createNewUserForm.controls.password.touched&&n.createNewUserForm.controls.password.hasError("pattern")),e.xp6(5),e.Q6J("ngIf",n.createNewUserForm.controls.role.touched&&n.createNewUserForm.controls.role.hasError("required"))}}function J(t,a){1&t&&(e.TgZ(0,"div")(1,"div",26)(2,"strong"),e._uU(3,"Please enter first Name!"),e.qZA(),e._UZ(4,"button",27),e.qZA()())}function E(t,a){1&t&&(e.TgZ(0,"div")(1,"div",26)(2,"strong"),e._uU(3,"Please enter Last Name!"),e.qZA(),e._UZ(4,"button",27),e.qZA()())}function Y(t,a){1&t&&(e.TgZ(0,"div")(1,"div",26)(2,"strong"),e._uU(3,"Please enter address!"),e.qZA(),e._UZ(4,"button",27),e.qZA()())}function S(t,a){1&t&&(e.TgZ(0,"div")(1,"div",26)(2,"strong"),e._uU(3,"Phone Number is required!"),e.qZA(),e._UZ(4,"button",27),e.qZA()())}function Q(t,a){if(1&t){const n=e.EpF();e.TgZ(0,"div"),e.YNc(1,J,5,0,"div",9),e.TgZ(2,"div",11)(3,"label",28),e._uU(4,"First Name"),e.qZA(),e._UZ(5,"input",29),e.qZA(),e.YNc(6,E,5,0,"div",9),e.TgZ(7,"div",30)(8,"label",31),e._uU(9,"Last Name"),e.qZA(),e._UZ(10,"input",32),e.qZA(),e.YNc(11,Y,5,0,"div",9),e.TgZ(12,"div",11)(13,"label",33),e._uU(14,"Address"),e.qZA(),e._UZ(15,"input",34),e.qZA(),e.YNc(16,S,5,0,"div",9),e.TgZ(17,"div",11)(18,"label",35),e._uU(19,"Phone"),e.qZA(),e._UZ(20,"input",36)(21,"br"),e.qZA(),e.TgZ(22,"div",37)(23,"button",38),e.NdJ("click",function(){e.CHM(n);const o=e.oxw();return e.KtG(o.next("credentials"))}),e._uU(24,"Back"),e.qZA(),e.TgZ(25,"button",39),e._uU(26,"Create New User"),e.qZA()()()}if(2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.createNewUserForm.controls.firstName.touched&&n.createNewUserForm.controls.firstName.hasError("required")),e.xp6(5),e.Q6J("ngIf",n.createNewUserForm.controls.lastName.touched&&n.createNewUserForm.controls.lastName.hasError("required")),e.xp6(5),e.Q6J("ngIf",n.createNewUserForm.controls.address.touched&&n.createNewUserForm.controls.address.hasError("required")),e.xp6(5),e.Q6J("ngIf",n.createNewUserForm.controls.phoneNumber.touched&&n.createNewUserForm.controls.phoneNumber.hasError("required"))}}let L=(()=>{var t;class a{next(r){this.step=r}constructor(r,o,l,c){this.route=r,this.userService=o,this.router=l,this.fb=c,this.step="credentials",this.isLoading=!1,this.createNewUserForm=this.fb.group({empId:[null,s.kI.compose([s.kI.required,s.kI.pattern("^[0-9]*$")])],email:[null,s.kI.compose([s.kI.required,s.kI.email])],password:[null,s.kI.compose([s.kI.required,s.kI.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")])],firstName:[null,s.kI.required],lastName:[null,s.kI.required],phoneNumber:[null,s.kI.compose([s.kI.required,s.kI.pattern("^[0-9]*$")])],address:[null,s.kI.required],role:[null,s.kI.required],isDisabled:!1}),this.errorMessage=""}createNewUser(){const r={empId:parseInt(this.createNewUserForm.controls.empId.value,10),email:this.createNewUserForm.controls.email.value,password:this.createNewUserForm.controls.password.value,firstName:this.createNewUserForm.controls.firstName.value,lastName:this.createNewUserForm.controls.lastName.value,phoneNumber:this.createNewUserForm.controls.phoneNumber.value,address:this.createNewUserForm.controls.address.value,role:this.createNewUserForm.controls.role.value,selectedSecurityQuestions:[],isDisabled:!1};this.userService.createNewUser(r).subscribe({next:o=>{console.log(o),this.router.navigate(["/admin/users"]),this.isLoading=!1},error:o=>{console.log("error",o),this.errorMessage=o.message,this.isLoading=!1}})}}return(t=a).\u0275fac=function(r){return new(r||t)(e.Y36(i.gz),e.Y36(p),e.Y36(i.F0),e.Y36(s.qu))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-user-new"]],decls:17,vars:3,consts:[[1,"container-fluid","pt-5"],[1,"row","justify-content-center"],[1,"new-user-container","col-lg-6","col-md-10","col-sm-12"],[1,"card"],[1,"card-title","pt-5"],[1,"m-5"],[3,"formGroup","ngSubmit"],[1,"form-group"],[1,"row","d-grid","form-content"],[4,"ngIf"],["routerLink","/admin/users",1,"return-btn"],[1,"col-12","my-3","w-75","text"],["for","empId"],["id","empId","type","text","formControlName","empId",1,"form-control"],["for","email"],["id","email","type","text","formControlName","email",1,"form-control"],["for","password"],["id","email","type","password","formControlName","password",1,"form-control"],[1,"col-12","my-3","mb-3","w-50","pb-3"],["for","role"],["name","role","id","role","formControlName","role",1,"form-select"],["value","","disabled",""],["value","admin"],["value","standard"],[1,"row","w-50","text-align","mx-auto","pt-3"],[1,"btn","button-home","mx-auto",3,"click"],["role","alert",1,"alert","alert-danger","alert-dismissible","fade","show"],["type","button","data-bs-dismiss","alert","aria-label","Close",1,"btn","btn-close"],["for","firstName"],["id","firstName","type","text","formControlName","firstName",1,"form-control"],[1,"col-12","my-3","w-75"],["for","lastName"],["id","lastName","type","text","formControlName","lastName",1,"form-control"],["for","address"],["id","address","type","text","formControlName","address",1,"form-control"],["for","phoneNumber"],["id","phoneNumber","type","text","formControlName","phoneNumber",1,"form-control"],[1,"row","w-75","column-gap-3","text-align","mx-auto","pt-3"],[1,"col","btn","btn-dark","mx-auto","w-25","button-back",3,"click"],["id","submit","value","submit",1,"col","btn","button-home","mx-auto","w-50"]],template:function(r,o){1&r&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h2"),e._uU(6,"Create New User"),e.qZA()(),e.TgZ(7,"div",5)(8,"form",6),e.NdJ("ngSubmit",function(){return o.createNewUser()}),e.TgZ(9,"fieldset",7)(10,"legend"),e._uU(11,"Please fill out all fields below"),e.qZA(),e.TgZ(12,"div",8),e.YNc(13,O,32,5,"div",9),e.YNc(14,Q,27,4,"div",9),e.qZA()()()()(),e.TgZ(15,"a",10),e._uU(16,"Return"),e.qZA()()()()),2&r&&(e.xp6(8),e.Q6J("formGroup",o.createNewUserForm),e.xp6(5),e.Q6J("ngIf","credentials"===o.step),e.xp6(1),e.Q6J("ngIf","personalInfo"===o.step))},dependencies:[u.O5,i.rH,s._Y,s.YN,s.Kr,s.Fj,s.EJ,s.JJ,s.JL,s.sg,s.u],styles:[".new-user-container[_ngcontent-%COMP%]{margin:5%}.card[_ngcontent-%COMP%]{color:#fff;background-color:#7f7e7d;border:dashed 5px #EEBA35}h2[_ngcontent-%COMP%]{font-weight:500;font-size:50px}h2[_ngcontent-%COMP%], legend[_ngcontent-%COMP%]{color:#fff092;text-align:center}p[_ngcontent-%COMP%]{text-align:center}.col-12[_ngcontent-%COMP%]{margin-left:10%}.button-home[_ngcontent-%COMP%]{text-align:center;font-weight:600;font-size:30px;background-color:#eeba35;font-family:Teko,sans-serif}.button-back[_ngcontent-%COMP%]{text-align:center;font-weight:600;font-size:30px;font-family:Teko,sans-serif}.return-btn[_ngcontent-%COMP%]{color:#fff}.return-btn[_ngcontent-%COMP%]:hover{background-color:#eeba35;color:#000;padding:10px}"]}),a})();var z=d(459);const D=[{path:"users",component:_,children:[{path:"",component:h,title:"BCRS: Users list"},{path:":empId/update",component:F,title:"BCRS: Update a user"},{path:"new",component:L,title:"BCRS: Create a New User"}],canActivate:[(t,a)=>{const n=(0,e.f3M)(z.N);let r=JSON.parse(n.get("session_user"));if(!r)return console.log("User is not logged in and cannot access this page!"),(0,e.f3M)(i.F0).navigate(["/security/signin"],{queryParams:{returnUrl:a.url}}),!1;if("admin"!==r.role){const o=(0,e.f3M)(i.F0);return console.log("Oops! You do not have the credentials to view this page!"),o.navigate(["/security/not-found"]),!1}return!0}]}];let R=(()=>{var t;class a{}return(t=a).\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[i.Bz.forChild(D),i.Bz]}),a})(),j=(()=>{var t;class a{}return(t=a).\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[u.ez,R,g.JF,i.Bz,s.u5,s.UX]}),a})()}}]);