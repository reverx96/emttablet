display = false
ESX = nil
local PlayerData = {}

local tabletModel = "prop_cs_tablet"
local tabletDict = "amb@world_human_seat_wall_tablet@female@base"
local tabletAnim = "base"

-- load jobData
Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end

	while ESX.GetPlayerData().job == nil do
		Citizen.Wait(10)
	end

	PlayerData = ESX.GetPlayerData()
end)

-- Animacja tabletu

function startTabletAnimation()
	Citizen.CreateThread(function()
	  RequestAnimDict(tabletDict)
	  while not HasAnimDictLoaded(tabletDict) do
	    Citizen.Wait(0)
	  end
		attachObject()
		TaskPlayAnim(GetPlayerPed(-1), tabletDict, tabletAnim, 8.0, -8.0, -1, 50, 0, false, false, false)
	end)
end

function attachObject()
	if tabletEntity == nil then
		Citizen.Wait(380)
		RequestModel(tabletModel)
		while not HasModelLoaded(tabletModel) do
			Citizen.Wait(1)
		end
		tabletEntity = CreateObject(GetHashKey(tabletModel), 1.0, 1.0, 1.0, 1, 1, 0)
		AttachEntityToEntity(tabletEntity, GetPlayerPed(-1), GetPedBoneIndex(GetPlayerPed(-1), 57005), 0.12, 0.10, -0.13, 25.0, 170.0, 160.0, true, true, false, true, 1, true)
	end
end

function stopTabletAnimation()
	if tabletEntity ~= nil then
		StopAnimTask(GetPlayerPed(-1), tabletDict, tabletAnim ,8.0, -8.0, -1, 50, 0, false, false, false)
		DeleteEntity(tabletEntity)
		tabletEntity = nil
	end
end


--[WYWOŁANIE TABLETU]
RegisterCommand("tab", function(source, args)
    TriggerEvent('emttabletpol')   
end)

RegisterNetEvent('tableton')
AddEventHandler('tableton', function()
TriggerEvent('emttabletpol')   
end)

--[WYŁĄCZENIE TABLETU]
RegisterNUICallback("exit", function(data)
    SetNuiFocus(false, false)
    stopTabletAnimation()
    SendNUIMessage({
        type = "ui",
        status = false,
    })
end)


RegisterNetEvent('emttabletpol')
AddEventHandler('emttabletpol', function(data)
    PlayerData = ESX.GetPlayerData()
        if PlayerData.job ~= nil then
            local jobName = PlayerData.job.name
            if jobName == 'ambulance' then
              
            --[WIDOCZNOSC TABLETU] 
                SetNuiFocus(true, true)
                startTabletAnimation() 
                SendNUIMessage({
                    type = "ui",
                    status = true,
                })
        end
    end
end)




--[MOZLIWOSC KORZYSTANIA Z TABLETU]
Citizen.CreateThread(function()
    while display do
        Citizen.Wait(0)

        DisableControlAction(0, 1, display) -- LookLeftRight
        DisableControlAction(0, 2, display) -- LookUpDown
        DisableControlAction(0, 142, display) -- MeleeAttackAlternate
        DisableControlAction(0, 18, display) -- Enter
        DisableControlAction(0, 322, display) -- ESC
        DisableControlAction(0, 106, display) -- VehicleMouseControlOverride
    end
end)

------------------------------------------------------------------------------------------------------ CLIENT WYSTAWIANIE FAKTUR


RegisterNUICallback('mandat', function(data, cb)
    local sender = GetPlayerServerId(player)
    local PlayerID = tonumber(data.playerid)
    if PlayerData.job.name == 'ambulance' then

            local amm = tonumber(data.mandatamount) / 100
            local playeramm = amm * 30
            local accamm = amm * 65
            local pod = amm * 5
            TriggerServerEvent("projektsantos21:mandat", PlayerID, tonumber(data.mandatamount), data.mandatreason)
            local tresc = "<br>Na konto EMS trafia: $"..accamm.."<br>Podatek: $"..pod..""
    
            SetNotificationTextEntry("STRING")
            AddTextComponentString(""..tresc.."")
            TriggerEvent('esx:showNotification', tresc)
            DrawNotification_4(false, true)
            Wait(2000)  
            
            -- TriggerServerEvent("projektsantos21:mandathajs", tonumber(data.mandatamount))
    else 
        TriggerEvent('esx:showNotification', 'Po co ci ten nui_devtools? :D')
    end
end)



--[Callback wysłania formularza do bazy danych]
RegisterNUICallback("AddForm", function(data)
    CinputData1 = data.inputData1
    CinputDane = data.inputDane
    CinputKrew1 = data.inputKrew1
    CinputObrazenia1 = data.inputObrazenia1
    CinputUszkodzenia1 = data.inputUszkodzenia1
    CinputZalecenia1 = data.inputZalecenia1 
    CinputOpiszal1 = data.inputOpiszal1
    CinputL41 = data.inputL41
    CinputLekarz1 = data.inputLekarz1

   if (CinputData1 or CinputDane1 or CinputKrew1 or CinputObrazenia1 or CinputUszkodzenia1 or CinputZalecenia1 or CinputOpiszal1 or CinputL41 or CinputLekarz1) ~= nil then
    TriggerServerEvent("AddFormServer",data)
    local tresc = "EMT DataBase".."<br><br>Dodano Rekord do bazy! "
    TriggerEvent('esx:showNotification', tresc)
   end
end)

--[Callback wyszuzkiwania po bazie po pacjencie]
RegisterNUICallback("Search", function(data)
    CinputSearch1 = data.inputSearch1

    if CinputSearch1 ~= nil then
    TriggerServerEvent("SearchServer",data)
    end
end)

--[Event do JS aby wysłać dane z bazy]
RegisterNetEvent("makeTableSearch")
    AddEventHandler("makeTableSearch", function(data)
        Wait(300)
        SendNUIMessage({
            type = "GetTableSearch",
            DataBase=data;
        })
    end)

    --[Callback wyszuzkiwania po bazie po lekarzu]
RegisterNUICallback("Search2", function(data)
    CinputSearch3 = data.inputSearch3

    if CinputSearch3 ~= nil then
    TriggerServerEvent("Search2Server",data)
    end
end)

--[Event do JS aby wysłać dane z bazy]
RegisterNetEvent("makeTableSearch2")
    AddEventHandler("makeTableSearch2", function(data)
        Wait(300)
        SendNUIMessage({
            type = "GetTableSearch2",
            DataBase2=data;
        })
    end)

   --[Callback wyszukań funkcji LAST]
RegisterNUICallback("SearchLast", function(data)
    CInputSearchLast1 = data.InputSearchLast1

    if CInputSearchLast1 ~= nil then
    TriggerServerEvent("SearchLastServer",data)
    Wait(300)
    end
end)

--[Event do JS aby wysłać dane z bazy]
RegisterNetEvent("makeTableSearchLast")
    AddEventHandler("makeTableSearchLast", function(data)

        Wait(300)
        SendNUIMessage({
            type = "GetTableSearchLast",
            DataBaseLast=data;
        })
    end)

    --[Callback usuwania z bazy]
RegisterNUICallback("Delete", function(data)
    CinputDelID1 = data.inputDelID1

    if CinputDelID1 ~= nil then
    TriggerServerEvent("DeleteServer",data)
    local tresc = "EMT DataBase".."<br><br>Usunięto Rekord do bazy! "
    TriggerEvent('esx:showNotification', tresc)
    Wait(300)
    end
end)

--[Callback Edycji rekordu]
RegisterNUICallback("Edit", function(data)
    CinputEditID1 = data.inputEditID1

    if CinputEditID1 ~= nil then
    TriggerServerEvent("EditServer",data)
    Wait(300)
    end
end)
--[Event Sciagniecia danych do formularza]
RegisterNetEvent("EditClient")
    AddEventHandler("EditClient", function(data)
        Wait(300)
        SendNUIMessage({
            type = "GetEditClient",
            DataBaseEdit=data;
        })
    end)

--[Callback do wyslania edytowanego formularza]
    RegisterNUICallback("EditForm", function(data)
        CinputData1 = data.inputData1
        CinputDane = data.inputDane1
        CinputKrew1 = data.inputKrew1
        CinputObrazenia1 = data.inputObrazenia1
        CinputUszkodzenia1 = data.inputUszkodzenia1
        CinputZalecenia1 = data.inputZalecenia1 
        CinputOpiszal1 = data.inputOpiszal1
        CinputL41 = data.inputL41
        CinputLekarz1 = data.inputLekarz1
    
        if (CinputData1 or CinputDane1 or CinputKrew1 or CinputObrazenia1 or CinputUszkodzenia1 or CinputZalecenia1 or CinputOpiszal1 or CinputL41 or CinputLekarz1) ~= nil then	
        TriggerServerEvent("EditFormServer",data)
        local tresc = "EMT DataBase".."<br><br>Edytowano rekord w bazie! "
            TriggerEvent('esx:showNotification', tresc)
        end
    end)


    RegisterNUICallback("Stats1", function(data)
        TriggerServerEvent("Stats1Server",data)
        Wait(300)
    end)

    RegisterNetEvent("Stats1Data") 
    AddEventHandler("Stats1Data", function(data)

        Wait(300)
        SendNUIMessage({
            type = "Stats1",
            Stats1=data;
        })
    end)

    RegisterNUICallback("Stats2", function(data)
        TriggerServerEvent("Stats2Server",data)
        Wait(300)
    end)
    RegisterNetEvent("Stats2Data") 
    AddEventHandler("Stats2Data", function(data)

        Wait(300)
        SendNUIMessage({
            type = "Stats2",
            Stats2=data;
        })
    end)

    RegisterNUICallback("Stats3", function(data)
        TriggerServerEvent("Stats3Server",data)
        Wait(300)
    end)
    RegisterNetEvent("Stats3Data") 
    AddEventHandler("Stats3Data", function(data)

        Wait(300)
        SendNUIMessage({
            type = "Stats3",
            Stats3=data;
        })
    end)

-- BLACK LISTA
RegisterNUICallback("AddBL", function(data)
    CinputDaneBL1 = data.inputDaneBL1
    CinputGrupaBL1 = data.inputGrupaBL1
    CInputUwagaBL1 = data.InputUwagaBL1

    if (CinputDaneBL1 and CinputGrupaBL1 and CInputUwagaBL1) ~= nil then
    TriggerServerEvent("AddBLServer",data)
    local tresc = "EMT DataBase".."<br><br>Dodano Rekord do bazy! "
    TriggerEvent('esx:showNotification', tresc)
    Wait(300)
    end
end)

RegisterNUICallback("SzukDane", function(data)
    CinputDaneSearch1 = data.inputDaneSearch1

    if CinputDaneSearch1  ~= nil then
    TriggerServerEvent("SzukDaneServer",data)
    Wait(300)
    end
end)

RegisterNetEvent("SzukDaneClient") 
AddEventHandler("SzukDaneClient", function(data)
    
    Wait(300)
    SendNUIMessage({
        type = "SzukDaneClient",
        SzukDaneClient=data;
    })
end)

RegisterNUICallback("SzukGrup", function(data)
    CinputGrupaSearch1 = data.inputGrupaSearch1

    if CinputGrupaSearch1 ~= nil then
    TriggerServerEvent("SzukGrupServer",data)
    Wait(300)
    end
end)

RegisterNetEvent("SzukGrupClient") 
AddEventHandler("SzukGrupClient", function(data)
    Wait(300)
    SendNUIMessage({
        type = "SzukGrupClient",
        SzukGrupClient=data;
    })
end)

RegisterNUICallback("SzukGrupAll", function(data)
    TriggerServerEvent("SzukGrupAllServer",data)
    Wait(300)
end)


RegisterNUICallback("DaneBaza1", function(data)
  PlayerData = ESX.GetPlayerData()

  while PlayerData.job == nil do
    Citizen.Wait(10)
  end

  while PlayerData.job.name ~= 'ambulance' do
    Citizen.Wait(10)
    end


  if PlayerData.job ~= nil and PlayerData.job.name=='ambulance' then

  jobName1 = PlayerData.job.name
  identifier = PlayerData.identifier 

  TriggerServerEvent("DaneBaza1Server", jobName1, identifier ,data)
  end

end)

RegisterNetEvent("DaneBaza1Client") 
AddEventHandler("DaneBaza1Client", function(data)
    PlayerData = ESX.GetPlayerData()
    Wait(300)
    SendNUIMessage({
        type = "DaneBaza1Client",
        DaneBaza1Client={
            jobGrade = PlayerData.job.grade_label,
            jobName = PlayerData.job.label,
            danelekarza = data.lekarzdane,
            iloscwpisow = data.wynik,
            odznaka = data.odznaka
              };
    })
end)

RegisterNUICallback("danepacjenta", function(data) 
    local closestPlayer, closestDistance = ESX.Game.GetClosestPlayer()
        if closestPlayer ~= -1 and closestDistance <= 3.0 then
      TriggerServerEvent("danepacjentaServer", GetPlayerServerId(closestPlayer), data)
        end
  end)
  
  RegisterNetEvent("danepacjentaClient") 
  AddEventHandler("danepacjentaClient", function(data)
      PlayerData = ESX.GetPlayerData()
      Wait(300)
      SendNUIMessage({
          type = "danepacjentaClient",
          datapacjenta={
              danepacjenta = data.danepacjenta,
                };
      })
  end)

  RegisterNUICallback("GetUbezpieczenieList", function(data)
    TriggerServerEvent("ServerMedicListOfMechanic",data)
    TriggerServerEvent("ServerMedicListOfSheriff",data)
    Wait(300)
end)

RegisterNetEvent("makeTableMechanic") 
AddEventHandler("makeTableMechanic", function(data)
    Wait(300)
    SendNUIMessage({
        type = "makeTableMechanic",
        makeTableMechanic=data;
    })
end)

RegisterNetEvent("makeTableSheriff") 
AddEventHandler("makeTableSheriff", function(data)
    Wait(300)
    SendNUIMessage({
        type = "makeTableSheriff",
        makeTableSheriff=data;
    })
end)


RegisterNetEvent("SzukGrupAllClient") 
AddEventHandler("SzukGrupAllClient", function(data)
    Wait(300)
    SendNUIMessage({
        type = "SzukGrupAllClient",
        SzukGrupAllClient=data;
    })
end)

