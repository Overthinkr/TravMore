export const optionsHelper = [
    {
        type: 'group', name: 'Eat and Drink', items: [
            { value: '100-1000-0000', label: 'Restaurants' },
            { value: '100-1000-0001', label: 'Casual Dining' },
            { value: '100-1000-0007', label: 'Cafeteria' },
            { value: '100-1000-0002', label: 'Fine Dining' },
            { value: '100-1000-0009', label: 'Fast Food' },
            { value: '100-1000-0008', label: 'Bistro' },
        ]
    },
    {
        type: 'group', name: 'Going out', items: [
            { value: '200-2000-0000', label: 'Entertainments' },
            { value: '200-2000-0011', label: 'Bar' },
            { value: '200-2000-0012', label: 'Night Club' },
            { value: '200-2000-0013', label: 'Dancing' },
            { value: '200-2000-0014', label: 'Karaoke' },
            { value: '200-2000-0016', label: 'Billiards' },
            { value: '200-2000-0015', label: 'Music' },
        ]
    }
];

export function TimeCalculate(timeString1, timeString2) {

    const date1 = new Date(timeString1);
    const date2 = new Date(timeString2);

    

    const timeDifferenceMillis = Math.abs(date2.getTime() - date1.getTime());

    const minutesDifference = Math.floor(timeDifferenceMillis / (1000 * 60));
    const hoursDifference = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));

    let difference;
    let unit;
    if (minutesDifference < 60) {
        difference = minutesDifference;
        unit = "mins";
    } else {
        difference = hoursDifference;
        unit = "hours";
    }

    return `${difference} ${unit}`;
}