export class DrAvailibilityObj{
    id: number = -1; 
    doctorID: number = -1; 
    start: Date|string = ""; 

    //removed end time each time slot is for 30 mins
    //end: Date|null = null; 
    room: number = -1; 
}