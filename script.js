(function(){
  //function to fetch data
  //function to loop through the response to create html elements
  //may be try doing a separate function to create mark up

  //function to fetch data

  async function fetchData(){
      const response = await fetch("http://sandbox.bittsdevelopment.com/code1/fetchemployees.php");

      return response.json();
  }


      //function to invoke fetchData and loop through the result

  async function readData(){
    let result = await fetchData();

    //console.log(result);
      for (let x in result){
      //console.log(result[x]);
      let {employeefname,employeelname, employeebio, employeeid} = result[x];
      let employeehaspic= result[x].employeehaspic === "1"? `http://sandbox.bittsdevelopment.com/code1/employeepics/${employeeid}.jpg` : null;
      let employeeisfeatured= result[x].employeeisfeatured === "1" ? "👑" : null;
      let roles = result[x].roles.map(role=>[role.rolename,role.rolecolor]);
      console.log(roles);

      createMarkUp(employeefname,employeelname,employeebio,roles,employeehaspic,employeeisfeatured)
      }
    }

    



 //function to create mark-up
  function createMarkUp(empName,empLname,emptitle,roles,pic,crown){
    let container= document.createElement("div");
    container.setAttribute("class","employee");
    let crownpic=document.createElement("span");
    crownpic.setAttribute('class','crown');
    crownpic.innerHTML=crown;
    let imageTag = document.createElement("img");
    imageTag.setAttribute("src",pic);
    imageTag.setAttribute("alt",`Image of ${empName} ${empLname}`);
    imageTag.setAttribute("class","profile_pic");
    let nameTag = document.createElement("h2");
    let name= document.createTextNode(`${empName} ${empLname}`);
    let titleTag = document.createElement("p");
    let title= document.createTextNode(emptitle);
    titleTag.appendChild(title);
    nameTag.appendChild(name);
    container.appendChild(imageTag);
    container.appendChild(crownpic);
    container.appendChild(nameTag);
    container.appendChild(titleTag);
    //loop through the roles array. It is an array of rolename and rolecolour
    for(let r= 0; r<roles.length; r++){
      let span =document.createElement('span');
      span.innerHTML= `${roles[r][0]}`;
      span.setAttribute("style",`background-color:${roles[r][1]}`)
      span.setAttribute("class","roles")
      container.appendChild(span);
      
    }
    let section = document.getElementById('section');
    section.appendChild(container)
  }

  readData();







})();