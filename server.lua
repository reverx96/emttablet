ESX = nil
 
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

function DiscordHook(hook,message,color)
  local hooke = 'https://discordapp.com/api/webhooks/709821135767994419/b_j_vBNH_m2GEWxZmx024ocgedTKH30UEIbir4biT-ks0yNaHKW4_Wmd6X-0EZJa7YXU'
  local embeds = {
              {
          ["title"] = message,
          ["type"] = "rich",
          ["color"] = color,
          ["footer"] = {
      ["text"] = 'CoCoRP | Logi'
                  },
              }
          }
  if message == nil or message == '' then return FALSE end
  PerformHttpRequest(hooke, function(err, text, headers) end, 'POST', json.encode({ username = hook,embeds = embeds}), { ['Content-Type'] = 'application/json' })
end

RegisterServerEvent('projektsantos21:mandat')
AddEventHandler('projektsantos21:mandat', function(target, fine, powod)
      
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(target)
        local identy = xPlayer.getIdentifier()
        local sourceXPlayer = ESX.GetPlayerFromId(_source)
        local targetXPlayer = ESX.GetPlayerFromId(target)
        local imieTargetu = GetCharacterName(target)
        local naziwskoTargetu = GetNazwisko(target)
        local imieSendera = GetCharacterName(_source)
        local nazwiskoSendera = GetNazwisko(_source)
        targetXPlayer.removeAccountMoney('bank', fine)
 
        TriggerEvent('esx_addonaccount:getSharedAccount', 'society_ambulance', function(account)
            account.addMoney(fine)
        end)
        
        TriggerClientEvent('esx:showNotification', _source, "Wystawiasz fakturę dla: ("..target..")")
        TriggerClientEvent('esx:showNotification', xPlayer.source, '('.._source..') Wystawił Ci fakturę na kwotę: ('..fine..'$) z powodem: ('..powod..')!')
        local xPlayers = ESX.GetPlayers()
 
        local steamid = sourceXPlayer.identifier
        local steamid2 = targetXPlayer.identifier
 
        local name1 = GetPlayerName(_source)
        local name2 = GetPlayerName(target)
 
        local dane = "[ID: ".._source.." | Nazwa: "..name1.." | SteamID: "..steamid.." ]"
        local dane2 = "[ID: "..target.." | Nazwa: "..name2.." | SteamID: "..steamid2.." ]"
                      
         wiadomosc = "Powód: "..powod.."\nKwota: "..fine.."\nKto wydał: "..dane.."\nKto otrzymał: "..dane2..""
 
        DiscordHook('EMS: Mandat', wiadomosc, 1669329)
end)
 
function GetCharacterName(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    local result = MySQL.Sync.fetchAll('SELECT * FROM users WHERE identifier = @identifier',
    {
        ['@identifier'] =  GetPlayerIdentifiers(source)[1]
    })
 
    if result[1] ~= nil and result[1].firstname ~= nil and result[1].lastname ~= nil then
        return result[1].firstname .. ' ' .. result[1].lastname
    else
        return GetPlayerName(source)
    end
end
 
function GetNazwisko(source)
    local result = MySQL.Sync.fetchAll('SELECT * FROM users WHERE identifier = @identifier',
    {
        ['@identifier'] = GetPlayerIdentifiers(source)[1]
    })
 
    if result[1] ~= nil and result[1].lastname ~= nil then
        return result[1].lastname
    else
        return GetPlayerName(source)
    end
end
-----------------------------------------------------------------------------------------------------------

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
--[ZAPISYWANIE DO BAZY DANYCH]
RegisterServerEvent("AddFormServer")
  AddEventHandler("AddFormServer",function(daneee)
    local _source = source

    MySQL.Async.fetchAll('INSERT INTO five (data, dane, obrazenia, zalecenia, krew, uszkodzenia, lekarz, opiszal, l4) VALUES (@data, @dane, @obrazenia, @zalecenia, @krew, @uszkodzenia, @lekarz, @opiszal, @l4)',     

    { 
    ['data'] = daneee.inputData1,
    ['dane'] =  daneee.inputDane1,
    ['obrazenia'] = daneee.inputObrazenia1,
    ['zalecenia'] =  daneee.inputZalecenia1,
    ['krew'] =  daneee.inputKrew1,
    ['uszkodzenia'] =  daneee.inputUszkodzenia1,
    ['lekarz'] =  daneee.inputLekarz1,
    ['opiszal'] = daneee.inputOpiszal1,
    ['l4'] =  daneee.inputL41,
    },
    function (result)
      --print(result)    
 end)
end)

--[ODCZYTYWANIE Z BAZY DANYCH KONKRETNYCH WYSZUKAŃ]
RegisterServerEvent('SearchServer')
  AddEventHandler("SearchServer",function(daneee)
    local _source = source

  MySQL.Async.fetchAll("SELECT * FROM five WHERE dane LIKE @danepacjenta",{ ['danepacjenta'] = daneee.inputSearch1}   
    ,function (result)
      TriggerClientEvent("makeTableSearch", _source, result)
    end)
end)

--[ODCZYTYWANIE Z BAZY DANYCH KONKRETNYCH WYSZUKAŃ]
RegisterServerEvent('Search2Server')
  AddEventHandler("Search2Server",function(daneee)
    local _source = source

  MySQL.Async.fetchAll("SELECT * FROM five WHERE lekarz = @lekarz",{ ['lekarz'] = daneee.inputSearch3}   
    ,function (result)
      TriggerClientEvent("makeTableSearch2", _source, result)
    end)
end)

--[ODCZYTYWANIE OSTATNICH REKORDÓW Z BAZY]
RegisterServerEvent("SearchLastServer")
  AddEventHandler("SearchLastServer",function(daneee)
    local _source = source

    MySQL.Async.fetchAll("SELECT * FROM five ORDER BY id DESC LIMIT @ilosc ",{ ['@ilosc'] = tonumber(daneee.InputSearchLast1);  }
    ,function (result)
      TriggerClientEvent("makeTableSearchLast", _source, result)
    end)
end)

--[Usuwanie rekordu z zbazy]
RegisterServerEvent("DeleteServer")
  AddEventHandler("DeleteServer",function(daneee)
    local _source = source

    MySQL.Async.fetchAll("DELETE FROM five WHERE ID = @id ",{ ['@id'] = tonumber(daneee.inputDelID1);  }
    ,function (result)
      TriggerClientEvent("makeTableSearchLast", _source, result)
    end)
end)

RegisterServerEvent("EditServer")
  AddEventHandler("EditServer",function(daneee)
    local _source = source

    MySQL.Async.fetchAll("SELECT * FROM five WHERE ID = @num ",{ ['@num'] = tonumber(daneee.inputEditID1);  }
    ,function (result)
      TriggerClientEvent("EditClient", _source, result)
    end)
end)

-- Podmianka rekordu z bazy

RegisterServerEvent("EditFormServer")
  AddEventHandler("EditFormServer",function(daneee)
    local _source = source

    MySQL.Async.fetchAll('UPDATE five SET data=@data, dane=@dane, obrazenia=@obrazenia, zalecenia=@zalecenia, krew=@krew, uszkodzenia=@uszkodzenia, lekarz=@lekarz, opiszal=@opiszal, l4=@l4 WHERE ID=@idrek',   

    { 
    ['idrek'] = tonumber(daneee.inputID1),
    ['data'] = daneee.inputData1,
    ['dane'] =  daneee.inputDane1,
    ['obrazenia'] = daneee.inputObrazenia1,
    ['zalecenia'] =  daneee.inputZalecenia1,
    ['krew'] =  daneee.inputKrew1,
    ['uszkodzenia'] =  daneee.inputUszkodzenia1,
    ['lekarz'] =  daneee.inputLekarz1,
    ['opiszal'] = daneee.inputOpiszal1,
    ['l4'] =  daneee.inputL41,
    },
    function (result)
      --print(result)    
 end)
end)

RegisterServerEvent("Stats1Server")
  AddEventHandler("Stats1Server",function(daneee)
    local _source = source

MySQL.Async.fetchAll("SELECT obrazenia, COUNT(obrazenia) AS ilosc FROM five GROUP BY obrazenia ORDER BY ilosc DESC",{}  
,function (result)
    TriggerClientEvent("Stats1Data", _source, result)
end)
end)

RegisterServerEvent("Stats2Server")
  AddEventHandler("Stats2Server",function(daneee)
    local _source = source

MySQL.Async.fetchAll("SELECT lekarz, COUNT(lekarz) AS ilosc FROM five GROUP BY lekarz ORDER BY ilosc DESC",{}   
,function (result)
    TriggerClientEvent("Stats2Data", _source, result)
end)
end)

RegisterServerEvent("Stats3Server")
  AddEventHandler("Stats3Server",function(daneee)
    local _source = source

MySQL.Async.fetchAll("SELECT dane, COUNT(dane) AS ilosc FROM five GROUP BY dane ORDER BY ilosc DESC",{}   
,function (result)
    TriggerClientEvent("Stats3Data", _source, result)
end)
end)

--Black lista
RegisterServerEvent("AddBLServer")
AddEventHandler("AddBLServer",function(daneee)
  local _source = source

  MySQL.Async.fetchAll('INSERT INTO blacklist (dane, grupa, uwaga) VALUES (@dane, @grupa, @uwaga)',     

  { 
  ['dane'] = daneee.inputDaneBL1,
  ['grupa'] =  daneee.inputGrupaBL1,
  ['uwaga'] = daneee.InputUwagaBL1,
  },
  function (result)
    --print(result)    
end)
end)

RegisterServerEvent("SzukDaneServer")
  AddEventHandler("SzukDaneServer",function(daneee)
    local _source = source

    MySQL.Async.fetchAll("SELECT * FROM blacklist WHERE dane=@dane ",{ ['dane'] = daneee.inputDaneSearch1  }
    ,function (result)
      TriggerClientEvent("SzukDaneClient", _source, result)
    end)
end)

RegisterServerEvent("SzukGrupServer")
  AddEventHandler("SzukGrupServer",function(daneee)
    local _source = source

    MySQL.Async.fetchAll("SELECT * FROM blacklist WHERE grupa=@grupa ",{ ['grupa'] = daneee.inputGrupaSearch1 }
    ,function (result)
      TriggerClientEvent("SzukGrupClient", _source, result)
    end)
end)

RegisterServerEvent("DaneBaza1Server")
  AddEventHandler("DaneBaza1Server",function(jobName1, identifier)

    local _source = source
    MySQL.Async.fetchAll("SELECT firstname, lastname, odznaka FROM users WHERE job=@job AND identifier=@identifier ",{
      ['@job'] = jobName1,
      ['@identifier'] = identifier
    },function(danee)

    if danee[1] ~= nil then
     
    local firstname = danee[1].firstname
    local lastname = danee[1].lastname
    local danelekarza = firstname .. " " .. lastname
    local odznaka = danee[1].odznaka
  

    local count = MySQL.Async.fetchAll("SELECT COUNT(lekarz) AS ilosc FROM five WHERE lekarz=@lekarz",
    {
      ['@lekarz'] = danelekarza
    },function(data)
    
   wynik1 = data[1].ilosc

    local result = {
      lekarzdane = danelekarza,
      wynik = wynik1,
      odznaka = odznaka,
    }
    --print(json.encode(result))
      TriggerClientEvent("DaneBaza1Client", _source, result)
    end)
  end

  end)
end)

RegisterServerEvent('ServerMedicListOfMechanic')
  AddEventHandler("ServerMedicListOfMechanic",function(daneee)
    local _source = source

  MySQL.Async.fetchAll("SELECT firstname, lastname FROM users WHERE job=@job OR job=@job2 ORDER BY lastname ",{ 
  ['job'] = 'mechanic',
  ['job2']= 'offmechanic'}   
    ,function (result)
      TriggerClientEvent("makeTableMechanic", _source, result)
    end)
end)

RegisterServerEvent('ServerMedicListOfSheriff')
  AddEventHandler("ServerMedicListOfSheriff",function(daneee)
    local _source = source

  MySQL.Async.fetchAll("SELECT firstname, lastname FROM users WHERE job=@job OR job=@job2 ORDER BY lastname",{ 
  ['job'] = 'sheriff',
  ['job2'] = 'offsheriff'}   
    ,function (result)
      TriggerClientEvent("makeTableSheriff", _source, result)
    end)
end)


RegisterServerEvent("danepacjentaServer")
  AddEventHandler("danepacjentaServer",function(target, daneee)

    local imieTargetu = GetCharacterName(target)

    local danepacjenta1 = imieTargetu
    local _source = source

    local result = {
      danepacjenta = danepacjenta1
 
    }
      TriggerClientEvent("danepacjentaClient", -1, result)
 

end)

RegisterServerEvent("SzukGrupAllServer")
  AddEventHandler("SzukGrupAllServer",function(daneee)
    local _source = source

    MySQL.Async.fetchAll("SELECT * FROM blacklist ", {}
    ,function (result)
      TriggerClientEvent("SzukGrupAllClient", _source, result)
    end)
end)