function get_date(){  
    let date = new Date();  
    
    // Update the Farsi date format to show month before day  
    let farsi_date = new Intl.DateTimeFormat("fa", {  
        month: "long",  
        day: "numeric",
        weekday: "long" 
    }).format(date).split(" ");  
    
    
    let english_date = new Intl.DateTimeFormat("en", {  
      month: "long",  
      day: "numeric",
      weekday: "long" 
  }).format(date).split(" "); 
  
    function get_date_text(d){  
        let day = d.getDate();  
        let month = d.getMonth() + 1; // month is 0-indexed  
        let year = d.getFullYear();  
        let full_date = `${year}-${month}-${day}`;  
    
        return full_date;  
    }  
  
    let fullDate_now = get_date_text(date);  
    
    let laterDate = new Date(date);  
    laterDate.setDate(date.getDate() + 5);  
  
    // Format the later date  
    let fullDate_later = get_date_text(laterDate);  
    
    return [fullDate_now, fullDate_later, farsi_date,english_date];  
  }  
console.log(get_date()[2]);