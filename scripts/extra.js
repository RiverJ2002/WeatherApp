function get_date(X){

  function get_date_text(d){  
    let day = d.getDate();  
    let month = d.getMonth() + 1; // month is 0-indexed  
    let year = d.getFullYear();  
    let full_date = `${year}-${month}-${day}`;  

    return full_date;  
}  

  let reqdate = new Date();  
  reqdate.setDate(reqdate.getDate() + X);  



    // Update the Farsi date format to show month before day  
  let farsi_date = new Intl.DateTimeFormat("fa", {  
    month: "long",  
    day: "numeric",
    weekday:"long"
  }).format(reqdate).split(" ");  

  // Format the later date  
  let english_date = get_date_text(reqdate);  

  let english_long_date = new Intl.DateTimeFormat("en", {  
    month: "long",  
    day: "numeric",
    weekday:"long"
  }).format(reqdate).split(" "); 
  

  return [english_date,farsi_date,english_long_date]; 

}  


console.log(get_date(0)[2])





  


  // Update the Farsi date format to show month before day  
 






