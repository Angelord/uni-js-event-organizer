
var events = {};

var controller = {

    validateCreation : function(name, adultOnly) {
        return (!isBlank(name));
    },

    validateRemoval : function(id) {
        return (id in events);
    },

    createEvent : function(name, adultOnly) {
        var event = new Event(name, adultOnly);
        events[event.id] = event;
        return event;
    },

    modifyEvent : function(id, name, adultOnly) {

    }, 

    removeEvent : function(id) {
        delete events[id];
    }
}

function Event(name, adultOnly) {

    this.id = idGenerator.next();
    this.name = name;
    this.adultOnly = adultOnly;  
}

function Client(firstName, lastName, gender, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.getFullName = function() { return this.firstName + " " + this.lastName; };
    this.gender = gender;
    this.age = age;
}

