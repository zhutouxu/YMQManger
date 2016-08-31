define(['app', 'views/getActivityUsersView', 'services/globalService'], function (app, View, GS) {

    function searchUsersList(query) {
        var placeNo = query.placeNo;

        GS.getActivitieUsers({
            placeNo: placeNo
        }, function(res) {
            var list = res.data;
            if(res.return_code === '0') { // 成功

              if(list.length !== 0) {
                  list.forEach(function(item) {
                      item.state = false;
                      if(app.utils.regExpParams(item.signIn, app.utils.toUnicode('已签到'))) {
                          item.state = true;
                      }
                  });
              }
            }
            View.reUsers({time: res.time, placeNo: placeNo, list: list});

        });
    }

    function init(query) {
        if(query) {
            searchUsersList(query);
        }
        View.render();

    }

    return {
        init: init
    };
});
