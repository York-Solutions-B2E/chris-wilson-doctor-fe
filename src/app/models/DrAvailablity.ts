//old idea didn't work 

export class DrAvailibilityObj {
    days: object[][] = [];

    constructor() {
        for (let i = 0; i < 7; i++) {
            this.days[i] = [];
        }
    }

    addAvailability(
        day: number = 0,
        startHour: number = 0,
        startMin: number = 0,
        endHour: number = 23,
        endMin: number = 59,
    ) {
        if (day > 6) throw new Error("Day must be between 0-6");

        this.days[day].push(this.timeObjectCreator(startHour, startMin, endHour, endMin));

    }

    removeAvailability(day: number, position: number) {
        if (day > 6) return;

        this.days[day].splice(position, 1);
    }

    changeAvailability(day: number = 0, position: number, startHour: number,
        startMin: number, endHour: number, endMin: number) {

        this.days[day][position] = this.timeObjectCreator(startHour, startMin, endHour, endMin);
    }

   

    private timeObjectCreator(startHours: number, startMins: number, endHours: number, endMins: number) {
    
        //TODO: write checking code
        return { 
            startHours: startHours,
            startMins: startMins, 
            endHours: endHours, 
            endMins: endMins 
        }
    }
}


//this doesn't work with json
export class TimeNode {
    hours: number = 0;
    mins: number = 0;

    constructor(hours: number = 0, mins: number = 0) {
        this.setTime(hours, mins);
    }

    setTime(hours: number, mins: number) {
        this.hours = hours;

        if (this.hours < 0) this.hours = 0;
        if (this.hours > 23) this.hours = 23;

        this.mins = mins

        if (this.mins < 0) this.mins = 0
        if (this.mins > 59) this.mins = 59;
    }

    addHours(hours: number) {
        this.hours += hours;

        if (this.hours > 23) this.hours = 0;
    }

    addMins(mins: number, overflow: boolean = true) {
        this.mins += mins;

        if (this.mins > 59) {
            this.mins -= 60;

            if (overflow) this.addHours(1);
        }
    }
}

