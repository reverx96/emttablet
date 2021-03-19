$(function () {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Widocznzość tabletu
    display(false)
    
    function display(bool) {
        if (bool) {
            $("#container").show();
            $("#DIVmenu").show();


            $("#DIVform").hide();
            $("#DIVserch").hide();
            $("#DIVstats").hide();
            $("#DIVserchLast").hide();

            $("#DIVblacklist").hide();
            $("#DIVregulamin").hide();
            $("#DIVkody").hide();
            $("#DIVleki").hide();

            $("#DIVdzialania").hide();
            $("#DIVdiagnoza").hide();
            $("#DIVcennik").hide();
            $("#DIVnotatnik").hide();
            $("#DIVubezpieczenie").hide();
        } else {
            $("#container").hide();
            $("#DIVmenu").hide();
        }

        // Wyswietlenie ostatnich 4 wpisów w menu
   
    }
    
    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type === "ui") {
            if (item.status == true) {
                display(true)

                let InputSearchLast = 10;
                $.post('http://emttablet/SearchLast', JSON.stringify({
                InputSearchLast1: InputSearchLast, }));
        
                $.post('http://emttablet/DaneBaza1', JSON.stringify({}));
                
                $.post('http://emttablet/DaneBaza2', JSON.stringify({}));

                document.getElementById("ID").value = "ID Pacjenta";
                document.getElementById("szukform").value = "Wyszukaj pacjenta...";
                document.getElementById("szukformlekarz").value = "Wyszukaj wpisy lekarza... ";

            } else {
                display(false)
            }
        }
    })
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   //Wyjscie za pomocą ESC
    document.onkeyup = function (data) {
        if (data.which == 27) {
            $.post('http://emttablet/exit', JSON.stringify({}));
        }
        return;
    };
    //Przycisk ENTER
    $(document).keypress(
        function(event){
          if (event.which == '13') {
            event.preventDefault();
          }
          return;
      });

    //Wyjscie za pomocą przyciusku
    $("#close").click(function () {
        $.post('http://emttablet/exit', JSON.stringify({}));
        return;
    })
   /////////////////////////////////////////// Funkcjonalne MENU
   window.addEventListener('message', function(event) {
    var item11 = event.data;

if (item11.type === "DaneBaza1Client")
{

            window.value = item11.DaneBaza1Client.danelekarza;

            var result11 = "<table border=1>";
            result11 += "<tr>";
            result11 += "<th colspan='2'>Informacje Personalne</th>";
            result11 += "</tr>";
            
            result11 += "<tr>";
            result11 += "<td>"+ "Numer Odznaki: "+"</td>";
            result11 += "<td>"+ item11.DaneBaza1Client.odznaka +"</td>"; 
            result11 += "</tr>";

            result11 += "<tr>";
            result11 += "<td>"+ "Stanowisko: "+"</td>";
            result11 += "<td>"+ item11.DaneBaza1Client.jobGrade+"</td>";
            result11 += "</tr>";

            result11 += "<tr>";
            result11 += "<td>"+ "Imie i Nazwisko: "+"</td>";
            result11 += "<td>"+item11.DaneBaza1Client.danelekarza+"</td>";
            result11 += "</tr>";

            result11 += "<tr>";
            result11 += "<td>"+ "Ilość Wpisów: "+"</td>";
            result11 += "<td>"+ item11.DaneBaza1Client.iloscwpisow +"</td>";
            result11 += "</tr>";

            result11 += "</table>";
            document.getElementById("tabela1").innerHTML = result11;

            var result11a ="Zalogowany jako: "+ item11.DaneBaza1Client.danelekarza;
            document.getElementById("login").innerHTML = result11a;

       }
    })

    $("#pobierzdanepacjenta").click(function () {
        $.post('http://emttablet/danepacjenta', JSON.stringify({}));
        return;
    }) 
    
    $("#ubezpieczenie").click(function () {
        $.post('http://emttablet/GetUbezpieczenieList', JSON.stringify({}));
        return;
    }) 

    window.addEventListener('message', function(event) {
        var item23 = event.data;
    
    if (item23.type === "makeTableMechanic")
    {
        
        var dlugosc23=event.data.makeTableMechanic.length;
        var tablica23 =[];

        for(var i = 0; i< dlugosc23; i++)
        {
            tablica23[i]=[]
        }
            for(var i = 0; i < dlugosc23; i++)
            {
    
                try{
                    tablica23[i][0]=item23.makeTableMechanic[i].firstname;    
                    tablica23[i][1]=item23.makeTableMechanic[i].lastname;
                }
                catch(error)
                {
                    tablica23[i][0]=""
                    tablica23[i][1]=""
                }
            }
    
        var result23 = "<table border=1>";
        result23 += "<tr>";
        result23 += "<th style='width: 1%'>Imię Mechanika</th>";
        result23 += "<th style='width: 2%'>Nazwisko Mechanika</th>";
        result23 += "</tr>";
    
                    for(var i=0; i<dlugosc23;i++)
                    {
                     
                        result23 += "<tr>";
                        for(var j=0; j<2; j++)
                        {
                            result23 += "<td>"+tablica23[i][j]+"</td>";
                        }
                        result23 += "</tr>";
                   
                    } 
                    result23 += "</table>";
                    document.getElementById("TableMechanic").innerHTML = result23;
    
        }
        })

    window.addEventListener('message', function(event) {
        var item22 = event.data;
    
    if (item22.type === "makeTableSheriff")
    {
        
        var dlugosc22=event.data.makeTableSheriff.length;
        var tablica22 =[];

        for(var i = 0; i< dlugosc22; i++)
        {
            tablica22[i]=[]
        }
            for(var i = 0; i < dlugosc22; i++)
            {
    
                try{
                    tablica22[i][0]=item22.makeTableSheriff[i].firstname;    
                    tablica22[i][1]=item22.makeTableSheriff[i].lastname;
                }
                catch(error)
                {
                    tablica22[i][0]=""
                    tablica22[i][1]=""
                }
            }
    
        var result22 = "<table border=1>";
        result22 += "<tr>";
        result22 += "<th style='width: 1%'>Imię FPD</th>";
        result22 += "<th style='width: 2%'>Nazwisko FPD</th>";
        result22 += "</tr>";
    
                    for(var i=0; i<dlugosc22;i++)
                    {
                     
                        result22 += "<tr>";
                        for(var j=0; j<2; j++)
                        {
                            result22 += "<td>"+tablica22[i][j]+"</td>";
                        }
                        result22 += "</tr>";
                   
                    } 
                    result22 += "</table>";
                    document.getElementById("TableSheriff").innerHTML = result22;
    
        }
        })

    window.addEventListener('message', function(event) {
        var item13 = event.data;
    
    if (item13.type === "danepacjentaClient")
    {
                document.getElementById("daneform").value = item13.datapacjenta.danepacjenta;
           }
        })

   // Funkcja wyszukiwania danej Osoby
   window.addEventListener('message', function(event) {
    var item2 = event.data

if (item2.type === "GetTableSearch")
{
      
    $("#SearchArrayDiv").show();
   
    var dlugosc=event.data.DataBase.length;
    var tablica =[];

    for(var i = 0; i< dlugosc; i++)
    {
        tablica[i]=[]
    }
        for(var i = 0; i < dlugosc; i++)
        {
            try{
            tablica[i][0]=item2.DataBase[i].ID;    
            tablica[i][1]=item2.DataBase[i].data;
            tablica[i][2]=item2.DataBase[i].dane;
            tablica[i][3]=item2.DataBase[i].obrazenia;
            tablica[i][4]=item2.DataBase[i].zalecenia;
            tablica[i][5]=item2.DataBase[i].krew;
            tablica[i][6]=item2.DataBase[i].uszkodzenia;
            tablica[i][7]=item2.DataBase[i].lekarz;
            tablica[i][8]=item2.DataBase[i].opiszal;
            tablica[i][9]=item2.DataBase[i].l4
            }
            catch(error)
            {
                tablica[i][0]=""
                tablica[i][1]=""
                tablica[i][2]=""
                tablica[i][3]=""
                tablica[i][4]=""
                tablica[i][5]=""
                tablica[i][6]=""
                tablica[i][7]=""
                tablica[i][8]=""
                tablica[i][9]=""
            }
        }
       
            var result = "<table border=1>";
            result += "<tr>";
            result += "<th style='width: 1%'>ID</th>";
            result += "<th style='width: 2%'>Data Zabiegu</th>";
            result += "<th style='width: 3%'>Dane Pacjenta</th>";
            result += "<th style='width: 5%'>Obrazenia</th>";
            result += "<th style='width: 3%'>Zalecenia</th>";
            result += "<th style='width: 1%'>Krew</th>";
            result += "<th style='width: 3%'>Ew Uszkodzenia</th>";
            result += "<th style='width: 3%'>Lekarz Prowadzacy</th>";
            result += "<th style='width: 3%'>Opis Zalecen</th>";
            result += "<th style='width: 1%'>L4</th>";
            result += "</tr>";
            

            for(var i=0; i<tablica.length;i++)
            {
             
            result += "<tr>";
                for(var j=0; j<10; j++)
                {
                    result += "<td>"+tablica[i][j]+"</td>";
                }
                result += "</tr>";
           
            } 
            result += "</table>";
            document.getElementById("count").innerHTML = dlugosc;
            document.getElementById("SearchTable").innerHTML = result;

            }})

            // Funkcja wyszukiwania danej Osoby
window.addEventListener('message', function(event) {
    var item14 = event.data

if (item14.type === "GetTableSearch2")
{
    $("#SearchArrayDiv").show();
   
    var dlugosc14=event.data.DataBase2.length;
    var tablica14 =[];

    console.debug(dlugosc14);

    for(var i = 0; i< dlugosc14; i++)
    {
        tablica14[i]=[]
    }
        for(var i = 0; i < dlugosc14; i++)
        {
            try{
                tablica14[i][0]=item14.DataBase2[i].ID;    
                tablica14[i][1]=item14.DataBase2[i].data;
                tablica14[i][2]=item14.DataBase2[i].dane;
                tablica14[i][3]=item14.DataBase2[i].obrazenia;
                tablica14[i][4]=item14.DataBase2[i].zalecenia;
                tablica14[i][5]=item14.DataBase2[i].krew;
                tablica14[i][6]=item14.DataBase2[i].uszkodzenia;
                tablica14[i][7]=item14.DataBase2[i].lekarz;
                tablica14[i][8]=item14.DataBase2[i].opiszal;
                tablica14[i][9]=item14.DataBase2[i].l4
            }
            catch(error)
            {
                tablica14[i][0]=""
                tablica14[i][1]=""
                tablica14[i][2]=""
                tablica14[i][3]=""
                tablica14[i][4]=""
                tablica14[i][5]=""
                tablica14[i][6]=""
                tablica14[i][7]=""
                tablica14[i][8]=""
                tablica14[i][9]=""
            }
        }


            var result14 = "<table border=1>";
            result14 += "<tr>";
            result14 += "<th style='width: 1%'>ID</th>";
            result14 += "<th style='width: 2%'>Data Zabiegu</th>";
            result14 += "<th style='width: 3%'>Dane Pacjenta</th>";
            result14 += "<th style='width: 5%'>Obrazenia</th>";
            result14 += "<th style='width: 3%'>Zalecenia</th>";
            result14 += "<th style='width: 1%'>Krew</th>";
            result14 += "<th style='width: 3%'>Ew Uszkodzenia</th>";
            result14 += "<th style='width: 3%'>Lekarz Prowadzacy</th>";
            result14 += "<th style='width: 3%'>Opis Zalecen</th>";
            result14 += "<th style='width: 1%'>L4</th>";
            result14 += "</tr>";
            

            for(var i=0; i<tablica14.length;i++)
            {
             
                result14 += "<tr>";
                for(var j=0; j<10; j++)
                {
                    result14 += "<td>"+tablica14[i][j]+"</td>";
                }
                result14 += "</tr>";
           
            } 
            result14 += "</table>";
            document.getElementById("count").innerHTML = dlugosc14;
            document.getElementById("SearchTable").innerHTML = result14;

            }})


    // Funkcja wyszukiwania Ostatnich rekordów
    window.addEventListener('message', function(event) {
        var item3 = event.data;

    if (item3.type === "GetTableSearchLast")
    {
        $("#SearchArrayDivLast").show();
        $("#SearchArrayDivLast1").show();

        var dlugosc1=event.data.DataBaseLast.length;
        var tablica1 =[];

        for(var i = 0; i< dlugosc1; i++)
        {
            tablica1[i]=[]
        }
            for(var i = 0; i < dlugosc1; i++)
            {
                try{
                    tablica1[i][0]=item3.DataBaseLast[i].ID;    
                    tablica1[i][1]=item3.DataBaseLast[i].data;
                    tablica1[i][2]=item3.DataBaseLast[i].dane;
                    tablica1[i][3]=item3.DataBaseLast[i].obrazenia;
                    tablica1[i][4]=item3.DataBaseLast[i].zalecenia;
                    tablica1[i][5]=item3.DataBaseLast[i].krew;
                    tablica1[i][6]=item3.DataBaseLast[i].uszkodzenia;
                    tablica1[i][7]=item3.DataBaseLast[i].lekarz;
                    tablica1[i][8]=item3.DataBaseLast[i].opiszal;
                    tablica1[i][9]=item3.DataBaseLast[i].l4
                }
                catch(error)
                {
                    tablica1[i][0]=""
                    tablica1[i][1]=""
                    tablica1[i][2]=""
                    tablica1[i][3]=""
                    tablica1[i][4]=""
                    tablica1[i][5]=""
                    tablica1[i][6]=""
                    tablica1[i][7]=""
                    tablica1[i][8]=""
                    tablica1[i][9]=""
                }
            }

                var result1 = "<table border=1>";
                result1 += "<tr>";
                result1 += "<th style='width: 1%'>ID</th>";
                result1 += "<th style='width: 2%'>Data Zabiegu</th>";
                result1 += "<th style='width: 3%'>Dane Pacjenta</th>";
                result1 += "<th style='width: 5%'>Obrazenia</th>";
                result1 += "<th style='width: 3%'>Zalecenia</th>";
                result1 += "<th style='width: 1%'>Krew</th>";
                result1 += "<th style='width: 3%'>Ew Uszkodzenia</th>";
                result1 += "<th style='width: 3%'>Lekarz Prowadzacy</th>";
                result1 += "<th style='width: 3%'>Opis Zalecen</th>";
                result1 += "<th style='width: 1%'>L4</th>";
                result1 += "</tr>";
                

                for(var i=0; i<tablica1.length;i++)
                {
                 
                    result1 += "<tr>";
                    for(var j=0; j<10; j++)
                    {
                        result1 += "<td>"+tablica1[i][j]+"</td>";
                    }
                    result1 += "</tr>";
               
                } 
                result1 += "</table>";
                if(dlugosc1==10)
                {
                document.getElementById("SearchTableLast1").innerHTML = result1;
                }else{
                document.getElementById("SearchTableLast").innerHTML = result1;}
            }
        })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


window.addEventListener('message', function(event) {
    var item5 = event.data;

if (item5.type === "Stats1")
{
    
    var dlugosc3=event.data.Stats1.length;
    var tablica3 =[];
    var suma = 0
    for(var i=0;i<dlugosc3;i++){
        suma+=item5.Stats1[i].ilosc;
    }

    for(var i = 0; i< dlugosc3; i++)
    {
        tablica3[i]=[]
    }
        for(var i = 0; i < dlugosc3; i++)
        {

            try{
                tablica3[i][0]=item5.Stats1[i].obrazenia;    
                tablica3[i][1]=item5.Stats1[i].ilosc;
                tablica3[i][2]=((((item5.Stats1[i].ilosc)/suma)*100)).toFixed(2)+"%";
            }
            catch(error)
            {
                tablica3[i][0]=""
                tablica3[i][1]=""
                tablica3[i][2]=""
            }
        }

    var result2 = "<table border=1>";
    result2 += "<tr>";
    result2 += "<th style='width: 1%'>Rodzaj obrazenia</th>";
    result2 += "<th style='width: 2%'>Ilość wpisów</th>";
    result2 += "<th style='width: 3%'>Udział</th>";
    result2 += "</tr>";

                for(var i=0; i<20;i++)
                {
                 
                    result2 += "<tr>";
                    for(var j=0; j<3; j++)
                    {
                        result2 += "<td>"+tablica3[i][j]+"</td>";
                    }
                    result2 += "</tr>";
               
                } 
                result2 += "</table>";
                document.getElementById("TableStats1").innerHTML = result2;

    }

    })
    window.addEventListener('message', function(event) {
        var item6 = event.data;
        if(item6.type === "Stats2"){
            
            var dlugosc4=event.data.Stats2.length;
            var tablica5 =[];
            var suma1 = 0

            for(var i=0; i<20; i++){
                suma1+=item6.Stats2[i].ilosc
            }
            for(var i = 0; i< 20; i++)
            {
                tablica5[i]=[]
            }
                for(var i = 0; i < 20; i++)
                {
        
                    try{
                        tablica5[i][0]=item6.Stats2[i].lekarz;    
                        tablica5[i][1]=item6.Stats2[i].ilosc;
                        tablica5[i][2]=((((item6.Stats2[i].ilosc)/suma1)*100)).toFixed(2)+"%";
                    }
                    catch(error)
                    {
                        tablica5[i][0]=""
                        tablica5[i][1]=""
                        tablica5[i][2]=""
                    }
                }
        
        
            var result3 = "<table border=1>";
            result3 += "<tr>";
            result3 += "<th style='width: 1%'>Dane Lekarza</th>";
            result3 += "<th style='width: 2%'>Ilość wpisów</th>";
            result3 += "<th style='width: 3%'>Udział</th>";
            result3 += "</tr>";
        
                        for(var i=0; i<tablica5.length;i++)
                        {
                         
                            result3 += "<tr>";
                            for(var j=0; j<3; j++)
                            {
                                result3 += "<td>"+tablica5[i][j]+"</td>";
                            }
                            result3 += "</tr>";
                       
                        } 
                        result3 += "</table>";
                        document.getElementById("TableStats2").innerHTML = result3;
        }


       })

    window.addEventListener('message', function(event) {
        var item10 = event.data;
        if(item10.type === "Stats3"){
            
            var dlugosc10=event.data.Stats3.length;
            var tablica10 =[];
            var suma10 = 0

            for(var i=0; i<dlugosc10; i++){
                suma10+=item10.Stats3[i].ilosc
            }
            for(var i = 0; i< 20; i++)
            {
                tablica10[i]=[]
            }
     
                for(var i = 0; i < 20; i++)
                {
        
                    try{
                        tablica10[i][0]=item10.Stats3[i].dane;    
                        tablica10[i][1]=item10.Stats3[i].ilosc;
                        tablica10[i][2]=((((item10.Stats3[i].ilosc)/suma10)*100)).toFixed(2)+"%";
                    }
                    catch(error)
                    {
                        tablica10[i][0]=""
                        tablica10[i][1]=""
                        tablica10[i][2]=""
                    }
                }
        
        
            var result10 = "<table border=1>";
            result10 += "<tr>";
            result10 += "<th style='width: 1%'>Dane Pacjenta</th>";
            result10 += "<th style='width: 2%'>Ilość wpisów</th>";
            result10 += "<th style='width: 3%'>Udział</th>";
            result10 += "</tr>";
        
                        for(var i=0; i<tablica10.length;i++)
                        {
                         
                            result10 += "<tr>";
                            for(var j=0; j<3; j++)
                            {
                                result10 += "<td>"+tablica10[i][j]+"</td>";
                            }
                            result10 += "</tr>";
                       
                        } 
                        result10 += "</table>";
                        document.getElementById("TableStats3").innerHTML = result10;
        }


       })

       



window.addEventListener('message', function(event) {
    var item7 = event.data;

if (item7.type === "SzukDaneClient")
{
    var dlugosc7=event.data.SzukDaneClient.length;
    var tablica7 =[];
    var arra = new Array(item7.SzukDaneClient)

    for(var i = 0; i< dlugosc7; i++)
    {
        tablica7[i]=[]
    }
        for(var i = 0; i < dlugosc7; i++)
        {
            try{
                tablica7[i][0]=item7.SzukDaneClient[i].dane;    
                tablica7[i][1]=item7.SzukDaneClient[i].grupa;
                tablica7[i][2]=item7.SzukDaneClient[i].uwaga;
            }
            catch(error)
            {
                tablica7[i][0]=""
                tablica7[i][1]=""
                tablica7[i][2]=""
            }
        }

            var result7 = "<table border=1>";
            result7 += "<tr>";
            result7 += "<th style='width: 1%'>Dane </th>";
            result7 += "<th style='width: 2%'>Grupa</th>";
            result7 += "<th style='width: 3%'>Uwaga</th>";
            result7 += "</tr>";
            

            for(var i=0; i<tablica7.length;i++)
            {
             
                result7 += "<tr>";
                for(var j=0; j<3; j++)
                {
                    result7 += "<td>"+tablica7[i][j]+"</td>";
                }
                result7 += "</tr>";
           
            } 
            result7 += "</table>";
            document.getElementById("BLtable").innerHTML = result7;

       }

    })

window.addEventListener('message', function(event) {
        var item8 = event.data;
    
    if (item8.type === "SzukGrupClient")
    {
        var dlugosc8=event.data.SzukGrupClient.length;
        var tablica8 =[];

        for(var i = 0; i< dlugosc8; i++)
        {
            tablica8[i]=[]
        }
            for(var i = 0; i < dlugosc8; i++)
            {
                try{
                    tablica8[i][0]=item8.SzukGrupClient[i].dane;    
                    tablica8[i][1]=item8.SzukGrupClient[i].grupa;
                    tablica8[i][2]=item8.SzukGrupClient[i].uwaga;
                }
                catch(error)
                {
                    tablica8[i][0]=""
                    tablica8[i][1]=""
                    tablica8[i][2]=""
                }
            }
           
                var result8 = "<table border=1>";
                result8 += "<tr>";
                result8 += "<th style='width: 1%'>Dane </th>";
                result8 += "<th style='width: 2%'>Grupa</th>";
                result8 += "<th style='width: 3%'>Uwaga</th>";
                result8 += "</tr>";
                

                for(var i=0; i<tablica8.length;i++)
                {
                 
                    result8 += "<tr>";
                    for(var j=0; j<3; j++)
                    {
                        result8 += "<td>"+tablica8[i][j]+"</td>";
                    }
                    result8 += "</tr>";
               
                } 
                result8 += "</table>";
                document.getElementById("BLtable").innerHTML = result8;
    
           }
        })

        window.addEventListener('message', function(event) {
            var item9 = event.data;
        
        if (item9.type === "SzukGrupAllClient")
        {
            var dlugosc9=event.data.SzukGrupAllClient.length;
            var tablica9 =[];
    
            for(var i = 0; i< dlugosc9; i++)
            {
                tablica9[i]=[]
            }
                for(var i = 0; i < dlugosc9; i++)
                {
                    try{
                        tablica9[i][0]=item9.SzukGrupAllClient[i].dane;    
                        tablica9[i][1]=item9.SzukGrupAllClient[i].grupa;
                        tablica9[i][2]=item9.SzukGrupAllClient[i].uwaga;
                    }
                    catch(error)
                    {
                        tablica9[i][0]=""
                        tablica9[i][1]=""
                        tablica9[i][2]=""
                    }
                }
               
                    var result9 = "<table border=1>";
                    result9 += "<tr>";
                    result9 += "<th style='width: 1%'>Dane </th>";
                    result9 += "<th style='width: 2%'>Grupa</th>";
                    result9 += "<th style='width: 3%'>Uwaga</th>";
                    result9 += "</tr>";
                    
    
                    for(var i=0; i<tablica9.length;i++)
                    {
                     
                        result9 += "<tr>";
                        for(var j=0; j<3; j++)
                        {
                            result9 += "<td>"+tablica9[i][j]+"</td>";
                        }
                        result9 += "</tr>";
                   
                    } 
                    result9 += "</table>";
                    document.getElementById("BLtable").innerHTML = result9;
        
               }
            })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Uzupelnianie lekarza!
$("#form").click(function(){
    document.getElementById("lekarzform").value = window.value
    $.post('http://emttablet/Search', JSON.stringify({}));
    return;
})
      //Wyjscie za pomocą przyciusku
      $("#ButtonFaktura").click(function () {
        let idgracza = $("#ID").val() 
        let powod = $("#powod").val()
        let kwota = $("#kwota").val()
        $.post('http://emttablet/mandat', JSON.stringify({
        playerid: idgracza,
        mandatamount: kwota,
        mandatreason: powod}));
        return;
    }) 

//Przycisk wyszukiwania osoby
$("#ButtonSearch").click(function(){
    let inputSearch = $("#szukform").val()
    $.post('http://emttablet/Search', JSON.stringify({
        inputSearch1: inputSearch, }));
    return;
})

$("#ButtonSearch2").click(function(){
    let inputSearch2 = $("#szukformlekarz").val()
    $.post('http://emttablet/Search2', JSON.stringify({
        inputSearch3: inputSearch2, }));
    return;
})


    //Przycisk wyszukania ostatnich osób
    $("#ButtonSearchLast").click(function(){
        let InputSearchLast = $("#Lastszukform").val()
        $.post('http://emttablet/SearchLast', JSON.stringify({
            InputSearchLast1: InputSearchLast, }));
        return;
    })

    $("#menu").click(function(){
    document.getElementById("ID").value = "";
    document.getElementById("szukform").value = "Wyszukaj pacjenta...";
    document.getElementById("szukformlekarz").value = "Wyszukaj wpisy lekarza...";
        let InputSearchLast = 10
        $.post('http://emttablet/SearchLast', JSON.stringify({
            InputSearchLast1: InputSearchLast, }));
        return;
    })

    
//Przycisk do usuwania i usuniecie rekordu
$("#ButtonDelete").click(function(){
    let inputDelID = $("#DeleteIDform").val()
    $.post('http://emttablet/Delete', JSON.stringify({
        inputDelID1: inputDelID, }));
    return;
})

//ButtonEdit
$("#ButtonEdit").click(function(){
    let inputEditID = $("#editform").val()
    $.post('http://emttablet/Edit', JSON.stringify({
        inputEditID1: inputEditID, }));
    return;
})

// STATYSTYKI
$("#statystyki").click(function(){
    $.post('http://emttablet/Stats1', JSON.stringify({}));
    $.post('http://emttablet/Stats2', JSON.stringify({}));
    $.post('http://emttablet/Stats3', JSON.stringify({}));
    return;
})

$("#AddBL").click(function(){
    let inputDaneBL = $("#daneformBL").val()
    let inputGrupaBL = ""
    let InputUwagaBL = $("#uwagaformBL").val()

    $.post('http://emttablet/AddBL', JSON.stringify({
        inputDaneBL1:inputDaneBL,
        inputGrupaBL1:inputGrupaBL,
        InputUwagaBL1:InputUwagaBL,
    }));
    return;
})

//po danych 
$("#szukajBL1").click(function(){
    let inputDaneSearch = $("#daneformBL1").val()
    $.post('http://emttablet/SzukDane', JSON.stringify({
        inputDaneSearch1:inputDaneSearch,
    }));
    return;
})
//po grupie blszuk2
$("#szukajBL2").click(function(){
    let inputGrupaSearch = ""
    $.post('http://emttablet/SzukGrup', JSON.stringify({
        inputGrupaSearch1:inputGrupaSearch,
    }));
    return;
})

$("#szukajAll").click(function(){

    $.post('http://emttablet/SzukGrupAll', JSON.stringify({}));
    return;
})

    //////////////////////////////////////Przycisk wysłania Formularza
    $("#AddNewForm").click(function(){
 ////////////////////////////////////////////////////////////////// CheckBoxy Obrazen/////////////////////////////////////////////////////////
 var check1 = document.getElementById("f1")
 var check2 = document.getElementById("f2")
 var check3 = document.getElementById("f3")
 var check4 = document.getElementById("f4")
 var check5 = document.getElementById("f5")
 var check6 = document.getElementById("f6")
 var check7 = document.getElementById("f7")
 var check8 = document.getElementById("f8")
 var check9 = document.getElementById("f9")
 var check10 = document.getElementById("f10")
 var check11 = document.getElementById("f11")
 var check12 = document.getElementById("f12")
 var check13 = document.getElementById("f13")
 var check14 = document.getElementById("f14")
 var check15 = document.getElementById("f15")
 var check16 = document.getElementById("f16")
 var check17 = document.getElementById("f17")
 var check18 = document.getElementById("f18")
 var check19 = document.getElementById("f19")
 // Zmienne do Checkboxów
 let obrazenia1 = ""
 let obrazenia2 = ""
 let obrazenia3 = ""
 let obrazenia4 = ""
 let obrazenia5 = ""
 let obrazenia6 = ""
 let obrazenia7 = ""
 let obrazenia8 = ""
 let obrazenia9 = ""
 let obrazenia10 = ""
 let obrazenia11 = ""
 let obrazenia12 = ""
 let obrazenia13 = ""
 let obrazenia14 = ""
 let obrazenia15 = ""
 let obrazenia16 = ""
 let obrazenia17 = ""
 let obrazenia18 = ""
 let obrazenia19 = ""

 if(check1.checked == true){ obrazenia1 = $("#f1").val() +" | "} 
 if(check2.checked == true){ obrazenia2 = $("#f2").val() +" | "}
 if(check3.checked == true){ obrazenia3 = $("#f3").val() +" | "} 
 if(check4.checked == true){ obrazenia4 = $("#f4x").val() +" | "}
 if(check5.checked == true){ obrazenia5 = $("#f5").val() +" | "} 
 if(check6.checked == true){ obrazenia6 = $("#f6").val() +" | "}
 if(check7.checked == true){ obrazenia7 = $("#f7").val() +" | "} 
 if(check8.checked == true){ obrazenia8 = $("#f8").val() +" | "}
 if(check9.checked == true){ obrazenia9 = $("#f9").val() +" | "} 
 if(check10.checked == true){ obrazenia10 = $("#f10").val() +" | "}
 if(check11.checked == true){ obrazenia11 = $("#f11").val() +" | "} 
 if(check12.checked == true){ obrazenia12 = $("#f12").val() +" | "}
 if(check13.checked == true){ obrazenia13 = $("#f13").val() +" | "} 
 if(check14.checked == true){ obrazenia14 = $("#f14").val() +" | "}
 if(check15.checked == true){ obrazenia15 = $("#f15").val() +" | "} 
 if(check16.checked == true){ obrazenia16 = $("#f16").val() +" | "}
 if(check17.checked == true){ obrazenia17 = $("#f17").val() +" | "} 
 if(check18.checked == true){ obrazenia18 = $("#f18").val() +" | "}
 if(check19.checked == true){ obrazenia19 = $("#f19").val() +" | "}


 let obrazeniaCheck = obrazenia1+obrazenia2+obrazenia3+obrazenia4+obrazenia5+obrazenia6+obrazenia7+obrazenia8+obrazenia9+obrazenia10+obrazenia11+obrazenia12+obrazenia13+obrazenia14+obrazenia15+obrazenia16+obrazenia17+obrazenia18+obrazenia19

 ////////////////////////////////////////////// CheckBoxy Zalecen ///////////////////////////////////////////////
 var fcheck1 = document.getElementById("ff1")
 var fcheck2 = document.getElementById("ff2")
 var fcheck3 = document.getElementById("ff3")

 let zalecenia=""

 if(fcheck1.checked == true){ zalecenia = $("#ff1").val() } 
 if(fcheck2.checked == true){ zalecenia = $("#ff2").val() }
 if(fcheck3.checked == true){ zalecenia = $("#ff3").val() } 

////////////////////////////////////////////////// Checkboxy L4 //////////////////////////////////////////////////
var lcheck1 = document.getElementById("fff1")
 var lcheck2 = document.getElementById("fff2")
 var lcheck3 = document.getElementById("fff3")
 var lcheck4 = document.getElementById("fff4")
 var lcheck5 = document.getElementById("fff5")
 
 let l4check=""

 if(lcheck1.checked == true){ l4check = $("#fff1").val() } 
 if(lcheck2.checked == true){ l4check = $("#fff2").val() }
 if(lcheck3.checked == true){ l4check = $("#fff3").val() } 
 if(lcheck4.checked == true){ l4check = $("#fff4").val() }
 if(lcheck5.checked == true){ l4check = $("#fff5").val() } 
////////////////////////////////////////////////// CheckBoxy Krwi /////////////////////////////////////////////
var kcheck1 = document.getElementById("ffff1")
 var kcheck2 = document.getElementById("ffff2")
 var kcheck3 = document.getElementById("ffff3")
 var kcheck4 = document.getElementById("ffff4")
 var kcheck5 = document.getElementById("ffff5")
 var kcheck6 = document.getElementById("ffff6")
 var kcheck7 = document.getElementById("ffff7")
 var kcheck8 = document.getElementById("ffff8")

 let grKrwi=""

 if(kcheck1.checked == true){ grKrwi = $("#ffff1").val() } 
 if(kcheck2.checked == true){ grKrwi = $("#ffff2").val() }
 if(kcheck3.checked == true){ grKrwi = $("#ffff3").val() } 
 if(kcheck4.checked == true){ grKrwi = $("#ffff4").val() }
 if(kcheck5.checked == true){ grKrwi = $("#ffff5").val() } 
 if(kcheck6.checked == true){ grKrwi = $("#ffff6").val() } 
 if(kcheck7.checked == true){ grKrwi = $("#ffff7").val() }
 if(kcheck8.checked == true){ grKrwi = $("#ffff8").val() } 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let inputData = $("#dataform").val()
    let inputDane = $("#daneform").val()
    let inputKrew = grKrwi
    let inputObrazenia = obrazeniaCheck +" " +$("#obrazeniaform").val() 
    let inputUszkodzenia = $("#uszkodzeniaform").val()
    let inputZalecenia = zalecenia
    let inputOpiszal = $("#opiszalform").val()
    let inputL4 = l4check
    let inputLekarz = $("#lekarzform").val()


    $.post('http://emttablet/AddForm', JSON.stringify({
        
        inputData1: inputData,
        inputDane1: inputDane,
        inputKrew1: inputKrew,
        inputObrazenia1: inputObrazenia,
        inputUszkodzenia1: inputUszkodzenia,
        inputZalecenia1: inputZalecenia,
        inputOpiszal1: inputOpiszal,
        inputL41: inputL4,
        inputLekarz1: inputLekarz,
    }));
        return;
    })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    $("#ClearForm1").click(function(){
document.getElementById("daneform").value = ""
document.getElementById("obrazeniaform").value = ""
document.getElementById("uszkodzeniaform").value= ""
document.getElementById("opiszalform").value= ""
document.getElementById("f1").checked  = false
document.getElementById("f2").checked  = false
document.getElementById("f3").checked  = false
document.getElementById("f4").checked  = false
document.getElementById("f5").checked  = false
document.getElementById("f6").checked  = false
document.getElementById("f7").checked  = false
document.getElementById("f8").checked  = false
document.getElementById("f9").checked  = false
document.getElementById("f10").checked  = false
document.getElementById("f11").checked  = false
document.getElementById("f12").checked  = false
document.getElementById("f13").checked  = false
document.getElementById("f14").checked  = false
document.getElementById("f15").checked  = false
document.getElementById("f16").checked  = false
document.getElementById("f17").checked  = false
document.getElementById("f18").checked  = false
document.getElementById("f19").checked  = false
document.getElementById("ff1").checked  = false
document.getElementById("ff2").checked  = false
document.getElementById("ff3").checked  = false
document.getElementById("fff1").checked  = false
document.getElementById("fff2").checked  = false
document.getElementById("fff3").checked  = false
document.getElementById("fff4").checked  = false
document.getElementById("fff5").checked  = false
document.getElementById("ffff1").checked  = false
document.getElementById("ffff2").checked  = false
document.getElementById("ffff3").checked  = false
document.getElementById("ffff4").checked  = false
document.getElementById("ffff5").checked  = false
document.getElementById("ffff6").checked  = false
document.getElementById("ffff7").checked  = false
document.getElementById("ffff8").checked  = false
    return;
    })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Szczzytywanie rekordu do formularza
window.addEventListener('message', function(event) {
    var item4 = event.data;

if (item4.type === "GetEditClient")
{
    let daneLog = document.getElementById("daneform");
    let daneVal = (item4.DataBaseEdit[0].dane).toString()

    let obrazeniaLog = document.getElementById("obrazeniaform");
    let obrazeniaVal = (item4.DataBaseEdit[0].obrazenia).toString()

    let uszkodzeniaLog = document.getElementById("uszkodzeniaform");
    let uszkodzeniaVal = (item4.DataBaseEdit[0].uszkodzenia).toString()

    let opiszalLog = document.getElementById("opiszalform");
    let opiszalVal = (item4.DataBaseEdit[0].opiszal).toString()

    let lekarzLog = document.getElementById("lekarzform");
    let lekarzVal = (item4.DataBaseEdit[0].lekarz).toString()

       
       daneLog.value = daneVal
       obrazeniaLog.value = obrazeniaVal
       uszkodzeniaLog.value = uszkodzeniaVal
       opiszalLog.value = opiszalVal
       lekarzLog.value = lekarzVal

       }
    })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Przycisk wysyłania edytowanego formularza

$("#ButtonEditSubmit").click(function(){
 ////////////////////////////////////////////////////////////////// CheckBoxy Obrazen/////////////////////////////////////////////////////////
 var check1 = document.getElementById("f1")
 var check2 = document.getElementById("f2")
 var check3 = document.getElementById("f3")
 var check4 = document.getElementById("f4")
 var check5 = document.getElementById("f5")
 var check6 = document.getElementById("f6")
 var check7 = document.getElementById("f7")
 var check8 = document.getElementById("f8")
 var check9 = document.getElementById("f9")
 var check10 = document.getElementById("f10")
 var check11 = document.getElementById("f11")
 var check12 = document.getElementById("f12")
 var check13 = document.getElementById("f13")
 var check14 = document.getElementById("f14")
 var check15 = document.getElementById("f15")
 var check16 = document.getElementById("f16")
 var check17 = document.getElementById("f17")
 var check18 = document.getElementById("f18")
 var check19 = document.getElementById("f19")
 // Zmienne do Checkboxów
 let obrazenia1 = ""
 let obrazenia2 = ""
 let obrazenia3 = ""
 let obrazenia4 = ""
 let obrazenia5 = ""
 let obrazenia6 = ""
 let obrazenia7 = ""
 let obrazenia8 = ""
 let obrazenia9 = ""
 let obrazenia10 = ""
 let obrazenia11 = ""
 let obrazenia12 = ""
 let obrazenia13 = ""
 let obrazenia14 = ""
 let obrazenia15 = ""
 let obrazenia16 = ""
 let obrazenia17 = ""
 let obrazenia18 = ""
 let obrazenia19 = ""

 if(check1.checked == true){ obrazenia1 = $("#f1").val() +" | "} 
 if(check2.checked == true){ obrazenia2 = $("#f2").val() +" | "}
 if(check3.checked == true){ obrazenia3 = $("#f3").val() +" | "} 
 if(check4.checked == true){ obrazenia4 = $("#f4x").val() +" | "}
 if(check5.checked == true){ obrazenia5 = $("#f5").val() +" | "} 
 if(check6.checked == true){ obrazenia6 = $("#f6").val() +" | "}
 if(check7.checked == true){ obrazenia7 = $("#f7").val() +" | "} 
 if(check8.checked == true){ obrazenia8 = $("#f8").val() +" | "}
 if(check9.checked == true){ obrazenia9 = $("#f9").val() +" | "} 
 if(check10.checked == true){ obrazenia10 = $("#f10").val() +" | "}
 if(check11.checked == true){ obrazenia11 = $("#f11").val() +" | "} 
 if(check12.checked == true){ obrazenia12 = $("#f12").val() +" | "}
 if(check13.checked == true){ obrazenia13 = $("#f13").val() +" | "} 
 if(check14.checked == true){ obrazenia14 = $("#f14").val() +" | "}
 if(check15.checked == true){ obrazenia15 = $("#f15").val() +" | "} 
 if(check16.checked == true){ obrazenia16 = $("#f16").val() +" | "}
 if(check17.checked == true){ obrazenia17 = $("#f17").val() +" | "} 
 if(check18.checked == true){ obrazenia18 = $("#f18").val() +" | "}
 if(check19.checked == true){ obrazenia19 = $("#f19").val() +" | "}


 let obrazeniaCheck = obrazenia1+obrazenia2+obrazenia3+obrazenia4+obrazenia5+obrazenia6+obrazenia7+obrazenia8+obrazenia9+obrazenia10+obrazenia11+obrazenia12+obrazenia13+obrazenia14+obrazenia15+obrazenia16+obrazenia17+obrazenia18+obrazenia19

 ////////////////////////////////////////////// CheckBoxy Zalecen ///////////////////////////////////////////////
 var fcheck1 = document.getElementById("ff1")
 var fcheck2 = document.getElementById("ff2")
 var fcheck3 = document.getElementById("ff3")

 let zalecenia=""

 if(fcheck1.checked == true){ zalecenia = $("#ff1").val() } 
 if(fcheck2.checked == true){ zalecenia = $("#ff2").val() }
 if(fcheck3.checked == true){ zalecenia = $("#ff3").val() } 

////////////////////////////////////////////////// Checkboxy L4 //////////////////////////////////////////////////
var lcheck1 = document.getElementById("fff1")
 var lcheck2 = document.getElementById("fff2")
 var lcheck3 = document.getElementById("fff3")
 var lcheck4 = document.getElementById("fff4")
 var lcheck5 = document.getElementById("fff5")
 
 let l4check=""

 if(lcheck1.checked == true){ l4check = $("#fff1").val() } 
 if(lcheck2.checked == true){ l4check = $("#fff2").val() }
 if(lcheck3.checked == true){ l4check = $("#fff3").val() } 
 if(lcheck4.checked == true){ l4check = $("#fff4").val() }
 if(lcheck5.checked == true){ l4check = $("#fff5").val() } 
////////////////////////////////////////////////// CheckBoxy Krwi /////////////////////////////////////////////
var kcheck1 = document.getElementById("ffff1")
 var kcheck2 = document.getElementById("ffff2")
 var kcheck3 = document.getElementById("ffff3")
 var kcheck4 = document.getElementById("ffff4")
 var kcheck5 = document.getElementById("ffff5")
 var kcheck6 = document.getElementById("ffff6")
 var kcheck7 = document.getElementById("ffff7")
 var kcheck8 = document.getElementById("ffff8")

 let grKrwi=""

 if(kcheck1.checked == true){ grKrwi = $("#ffff1").val() } 
 if(kcheck2.checked == true){ grKrwi = $("#ffff2").val() }
 if(kcheck3.checked == true){ grKrwi = $("#ffff3").val() } 
 if(kcheck4.checked == true){ grKrwi = $("#ffff4").val() }
 if(kcheck5.checked == true){ grKrwi = $("#ffff5").val() } 
 if(kcheck6.checked == true){ grKrwi = $("#ffff6").val() } 
 if(kcheck7.checked == true){ grKrwi = $("#ffff7").val() }
 if(kcheck8.checked == true){ grKrwi = $("#ffff8").val() } 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let inputEditID = $("#editform").val()
    let inputData = $("#dataform").val()
    let inputDane = $("#daneform").val()
    let inputKrew = grKrwi
    let inputObrazenia = obrazeniaCheck +" " +$("#obrazeniaform").val() 
    let inputUszkodzenia = $("#uszkodzeniaform").val()
    let inputZalecenia = zalecenia
    let inputOpiszal = $("#opiszalform").val()
    let inputL4 = l4check
    let inputLekarz = $("#lekarzform").val()

    $.post('http://emttablet/EditForm', JSON.stringify({
        inputID1: inputEditID,
        inputData1: inputData,
        inputDane1: inputDane,
        inputKrew1: inputKrew,
        inputObrazenia1: inputObrazenia,
        inputUszkodzenia1: inputUszkodzenia,
        inputZalecenia1: inputZalecenia,
        inputOpiszal1: inputOpiszal,
        inputL41: inputL4,
        inputLekarz1: inputLekarz,
    }));
        return;
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})