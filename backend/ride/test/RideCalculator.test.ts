import { isOvernight, isSunday } from "../src/RideCalculator";

test("Deve testar se é overnight", function () {
    const segment = {
        distance: 10, date: new Date("2021-03-01T23:00:00")        
    };
    expect(isOvernight(segment)).toBeTruthy();
});

test("Deve testar se é domingo", function () {
    const segment = {
        distance: 10, date: new Date("2021-03-07T23:00:00")        
    };
    expect(isSunday(segment)).toBeTruthy();
});
