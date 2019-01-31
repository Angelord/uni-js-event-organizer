
var TABLE_ID = "table_events";

var filterer = new Filterer();

populate();

redrawEvents();

function populate() {
    var ev = new Event("Wedding", new Date(), false, 0);
    data.addEvent(ev);
    if(ev) {
        ev.addClient(new Client("Ivan", "Georgiev", "male", 18));
        ev.addClient(new Client("Mariq", "Ivanova", "female", 22));
    }

    var ev = new Event("New Year's Party", new Date(), true, 100);
    data.addEvent(ev);
    if(ev) {
        ev.addClient(new Client("Georgi", "Gechev", "male", 28));
    }
}

function redrawEvents() {

    var evTable = document.getElementById(TABLE_ID);
    evTable.innerHTML = "";
    fillEventTable(evTable);
}

function fillEventTable(table) {
    
    var filteredEvents = filterer.filterEvents(data.getEvents());
    for(var key in filteredEvents) {
        var event = filteredEvents[key];

        var row = document.createElement("div");
        row.className = "row";

        var idEl = HtmlUtil.createElementWithText("div", event.id, "col");
        var nameDisplay = (event.price > 0 ? "$" : "!") + " " + (event.adultOnly ? "*" : "#") + " " + event.name;
        var nameEl = HtmlUtil.createElementWithText("div", nameDisplay, "col");
        var dateEl = HtmlUtil.createElementWithText("div", event.getDate(), "col");
        var adultOnly = HtmlUtil.createElementWithText("div", event.adultOnly ? "+18" : "", "col");
        var price = HtmlUtil.createElementWithText("div", event.price, "col");
        
        row.appendChild(idEl);
        row.appendChild(nameEl);
        row.appendChild(dateEl);
        row.appendChild(adultOnly);
        row.appendChild(price);

        var filteredClients = filterer.filterClients(event.clients);

        if(filteredClients.length > 0) {
            row.appendChild(createClientHeader());
        }

        CollectionUtil.forEach(filteredClients, function (client, index) {

            var innerRow = document.createElement("div");
            innerRow.className = "inner_row";
            var cIdEl = HtmlUtil.createElementWithText("div", index, "col");
            var clNameEl = HtmlUtil.createElementWithText("div", client.getFullName(), "col");
            var clGenderEl = HtmlUtil.createElementWithText("div", client.gender, "col");
            var clAgeEl = HtmlUtil.createElementWithText("div", client.age, "col");
            var deleteBtn = HtmlUtil.createElementWithClass("div", "col");
            deleteBtn.innerHTML = ("<button onclick=\"controller.removeClient('" + key + "','" + index + "')\">Delete</button>");

            innerRow.appendChild(cIdEl);
            innerRow.appendChild(clNameEl);
            innerRow.appendChild(clGenderEl);
            innerRow.appendChild(clAgeEl);
            innerRow.appendChild(deleteBtn);
            row.appendChild(innerRow);
        } );

        table.appendChild(row);
    }
}

function createClientHeader() {
    var headerRow = HtmlUtil.createElementWithClass("div", "inner_row");
    var id = HtmlUtil.createElementWithText("div", "ID", "col");
    var name = HtmlUtil.createElementWithText("div", "Name", "col");
    var gender = HtmlUtil.createElementWithText("div", "Gender", "col");
    var age = HtmlUtil.createElementWithText("div", "Age", "col");
    var deleteBtn = HtmlUtil.createElementWithClass("div", "col");

    headerRow.appendChild(id);
    headerRow.appendChild(name);
    headerRow.appendChild(gender);
    headerRow.appendChild(age);
    headerRow.appendChild(deleteBtn);

    return headerRow;
}

function modifyEvent() {
    var id = document.forms["modifyEvent"]["id"].value;
    var name = document.forms["modifyEvent"]["name"].value;
    var adultOnly = document.forms["modifyEvent"]["adultOnly"].checked;
    var price = document.forms["modifyEvent"]["price"].value;

    controller.modifyEvent(id, name, adultOnly, price);
    redrawEvents();
}

function addClient() {
    var evId = document.forms["addClient"]["eventId"].value;
    var firstName = document.forms["addClient"]["firstName"].value;
    var lastName = document.forms["addClient"]["lastName"].value;
    var gender = document.forms["addClient"]["gender"].value;
    var age = document.forms["addClient"]["age"].value;

    controller.addClient(evId, firstName, lastName, gender, age);
    redrawEvents();
}



