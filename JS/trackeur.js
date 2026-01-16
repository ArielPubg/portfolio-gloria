
(async function(){
    try{

        // donneee de locaalsation

        const reponse = await fetch('https://ipapi.co/json/');
        const donnees = await reponse.json();
        console.log(donnees);
        // CREATION DE L'OBJET A ENVOYER
        const envoyer = {
            page:window.location.pathname,
            navigateur:navigator.userAgent,
            date:new Date().toLocaleString(),
            pays:donnees.country_name || 'Inconnu',
        }

        // Envoi des donnees a google sheet
        await fetch('https://script.google.com/macros/s/AKfycbzkpr26x1oTBYVnUuxMfOM_k22emmTkH4x2rwUtONJ1UZenvkpWgHzOV-81q9Z0IhuvTA/exec',{
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(envoyer)

        });

        console.log("Données de suivi envoyées avec succès");
    }catch(err){
        console.log("Une erreur s'est produite");
    }


})();