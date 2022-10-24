
fetch("http://www.boredapi.com/api/activity?type=recreational")
.then(response => response.json())
.then(boredActivity => {
    console.log(boredActivity);
})