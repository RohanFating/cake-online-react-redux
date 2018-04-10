export const mockResponse = [{ name: 'My Cake', imageUrl: 'http://www/ab.com/abc.jpg', comment: 'nice', yumFactor: '3' }];

export const mockAddCakeFormData = {
    details: {
        name: {
            value: 'My Cake',
            isValid: true,
            isTouched: false
        },
        comment: {
            value: 'Nice One',
            isValid: true,
            isTouched: false
        },
        imageUrl: {
            value: 'http://www.abc.com/abc.jpg',
            isValid: true,
            isTouched: false
        },
        yumFactor: 1
    },
    isCakeAdded: false,
    isError: false
}