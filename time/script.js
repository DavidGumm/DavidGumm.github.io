function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name+'=; Max-Age=-99999999;';
}

function save(saveTimes) {
  document.cookie = 'time=' + saveTimes;
}

function isFUll(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return true;
    }
    return false;
}

function getTime(hours, minutes) {
  var time = null;
  minutes = minutes + "";
  hours = hours + "";

  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }

  if (hours.length == 1) {
    hours = "0" + hours;
  }
  return hours + ":" + minutes;
}

function slideTime_1(event, ui) {
  var val0 = $("#slider-range-1").slider("values", 0),
    val1 = $("#slider-range-1").slider("values", 1),
    minutes0 = parseInt(val0 % 60, 10),
    hours0 = parseInt((val0 / 60) % 24, 10),
    minutes1 = parseInt(val1 % 60, 10),
    hours1 = parseInt((val1 / 60) % 24, 10);

  startTime = getTime(hours0, minutes0);
  endTime = getTime(hours1, minutes1);
  document.getElementById("times-first-start").value = startTime;
  document.getElementById("times-first-end").value = endTime;

  time_diff();
}

function slideTime_2(event, ui) {
  var val0 = $("#slider-range-2").slider("values", 0),
    val1 = $("#slider-range-2").slider("values", 1),
    minutes0 = parseInt(val0 % 60, 10),
    hours0 = parseInt((val0 / 60) % 24, 10),
    minutes1 = parseInt(val1 % 60, 10),
    hours1 = parseInt((val1 / 60) % 24, 10);

  startTime = getTime(hours0, minutes0);
  endTime = getTime(hours1, minutes1);
  document.getElementById("times-second-start").value = startTime;
  document.getElementById("times-second-end").value = endTime;

  time_diff();
}

function time_diff(start, end, out) {
  var time = new Object();
  time.first = new Object();
  time.lunch = new Object();
  time.second = new Object();

  var start_1 = document.getElementById("times-first-start").value;
  var end_1 = document.getElementById("times-first-end").value;

  var start_2 = document.getElementById("times-second-start").value;
  var end_2 = document.getElementById("times-second-end").value;

  var lunch = document.getElementById("lunch-checkbox");

  var output_1 = document.getElementById("time_diff_out-1");
  var output_2 = document.getElementById("time_diff_out-2");
  var output_lunch = document.getElementById("time_diff_out-lunch");
  var output_total = document.getElementById("total_time_diff_out");

  var lunch_start;
  var lunch_end;

  if (lunch.checked) {
    time.lunch.taken = true;
    lunch_start = end_1;
    lunch_end = start_2;
  } else {
    time.lunch.taken = false;
    lunch_start = "0:00";
    lunch_end = "0:00";
  }

  time.first.start = new Date(
    2000,
    0,
    1,
    start_1.split(":")[0],
    start_1.split(":")[1]
  );
  time.first.end = new Date(
    2000,
    0,
    1,
    end_1.split(":")[0],
    end_1.split(":")[1]
  );
  time.lunch.start = new Date(
    2000,
    0,
    1,
    lunch_start.split(":")[0],
    lunch_start.split(":")[1]
  );
  time.lunch.end = new Date(
    2000,
    0,
    1,
    lunch_end.split(":")[0],
    lunch_end.split(":")[1]
  );
  time.second.start = new Date(
    2000,
    0,
    1,
    start_2.split(":")[0],
    start_2.split(":")[1]
  );
  time.second.end = new Date(
    2000,
    0,
    1,
    end_2.split(":")[0],
    end_2.split(":")[1]
  );

  var diff_1 = (time.first.end - time.first.start) / 3600000;
  var diff_2 = (time.second.end - time.second.start) / 3600000;
  var diff_lunch = (time.lunch.end - time.lunch.start) / 3600000;

  if(diff_lunch > 1 )
  {
    diff_lunch = 1;
  }

  output_total.textContent = (diff_1 + diff_2 + diff_lunch).toFixed(2);
  output_1.textContent = diff_1.toFixed(2);
  output_2.textContent = diff_2.toFixed(2);
  output_lunch.textContent = diff_lunch.toFixed(2);
  setCookie('time',JSON.stringify(time),99);
}
