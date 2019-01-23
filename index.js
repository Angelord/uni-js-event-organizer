
var TABLE_ID = "table_events";

controller.createEvent("Wedding", false);
controller.createEvent("New Year's Party", true);
displayEvents();

function displayEvents() {

    var evTable = document.getElementById(TABLE_ID);
    evTable.innerHTML = "";
    fillEventTable(evTable);
}

function fillEventTable(table) {

    for(var key in events) {
        var event = events[key];

        var row = document.createElement("div");
        row.className = "row";

        var idEl = createElementWithText("div", event.id);
        var nameEl = createElementWithText("div", event.name);
        var adultOnly = createElementWithText("div", event.adultOnly ? "+18" : "");

        idEl.className = nameEl.className = adultOnly.className = "col";

        row.appendChild(idEl);
        row.appendChild(nameEl);
        row.appendChild(adultOnly);

        table.appendChild(row);
    }
}

function createElementWithText(elType, text) {
    var element = document.createElement(elType);
    element.innerHTML = text;
    return element;
}

function validateCreation() {
    var nameField = document.getElementById("input_add_name");
    var adultField = document.getElementById("input_add_adult");

    return controller.validateCreation(nameField.value, adultField.value);
}

function validateModify() {
    var idField = document.getElementById("input_mod_id");
    var nameField = document.getElementById("input_mod_name");
    var adultField = document.getElementById("input_mod_adult");

    return controller.validateModify(idField.value, nameField.value, adultField.checked);
}

function validateRemoval() {
    var removeField = document.getElementById("input_remove_id");
    
    return controller.validateRemoval(removeField.value);
}

function createEvent() {
    var nameField = document.getElementById("input_add_name");
    var adultField = document.getElementById("input_add_adult");

    controller.createEvent(nameField.value, adultField.checked);
    displayEvents();
}

function modifyEvent() {
    var idField = document.getElementById("input_mod_id");
    var nameField = document.getElementById("input_mod_name");
    var adultField = document.getElementById("input_mod_adult");

    controller.modifyEvent(idField.value, nameField.value, adultField.checked);
    displayEvents();
}

function removeEvent() {
    var removeField = document.getElementById("input_remove_id");

    var removedEv = controller.removeEvent(removeField.value);
    displayEvents();
    alert("Removed event with name " + removedEv.name);
}

