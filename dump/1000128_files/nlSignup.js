  var seters;
  $('#nl-signup').on('submit', function(event) {
    event.preventDefault();
    var pathArray = location.href.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    // var urll = protocol + '//' + host;
    var name =null;
      // if(nl.name.length>0){
        name = $('#nl-name').val()
      // }
    $.ajax({url: 'https://ptclinic.com/site/signup_processorORM.php',
      type: 'GET',
      data: {
        'practice_id':nl.pid,
        'contact_name':name,
        'contact_email':$('#nl-email').val(),
        'g-recaptcha-response':seters,
        'urldata':host,
      },complete:function(s){
        s = JSON.parse(s.responseText);
        console.log(host);
        console.log(s);
        if(s['success']=='true'){
          $('#nl-signup').empty().css({'padding':'0px 2px','textAlign':'center','color':'#73a839'}).html('<span>Thank You For Signing Up!</span>');
        }else{
          $('#nl-signup').empty().css({'padding':'0px 2px','textAlign':'center','color':'#E74C3C'}).html('<span>Invalid Submission.</span>');
        }
      }
    });

  });
  function YourOnSubmitFn(token) {  seters=token;}
