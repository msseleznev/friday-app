export const setGradeColor = (grade: number) => {
    if (grade === 0) {
        return '#444444'
    } else if (grade <= 2) {
        return '#BD362F'
    } else if (grade <= 4.5) {
        return '#F0AD4E'
    } else {
        return '#4CAF50'
    }
}