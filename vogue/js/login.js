$(() => {
    const mid = $("#mid");
    const mpw = $("#mpw");

    $("#sbtn").click(function (e) {
        e.preventDefault();

        const groSpace = (x) => x.replace(/\s+/g, "");
        if (groSpace(mid.val()) == "" || groSpace(mpw.val()) == "") {
            alert("아이디 비번입력해야합니다");
            mid.val("").focus();
            mpw.val("");
        } else {
            // DB조회 페이지 호출하여 결과를 받아서 처리
            // Ajax의 post 매서드 사용
            // $.post(url,data,callback)
            $.post(
                // 1.전송할 페이지
                "./process/loginSet.php",
                // 2.전송할 데이터
                {
                    mid: mid.val(), //아이디
                    mpw: mpw.val(), //비밀번호
                },
                // 결과처리 함수(콜백함수)
                function (res) {
                    console.log(res);
                    if (res == "ok") {
                        alert("로그인성공");
                        location.href = "index.php";
                    } else if (res == "again") {
                        alert("비밀번호가 틀렷습니다");
                        // 비밀번호 지우고 비번에 포커스
                        mpw.val("").focus();
                    } else if (res == "no") {
                        alert("존재하지않는 아이디입니다");
                        mid.val("").focus();
                        mpw.val("");
                    }
                },
            /*************************************************************** 
                [ 로그인 성공후 어떤일이 일어나나? ]

                1. 로그인인 성공하면 서버에 사용자로그인 정보를
                기록한다. 이것이 세션이라고 불리우는 서버 메모리공간이다!

                2. 이 세션에 변수를 할당하여 필요한 사용자 정보를
                로그인 시간동안 유지하여 사용한다!
                -> 이것을 세션변수라고 함!
                -> 이것때문에 로그인 상태가 유지되어 시스템을 
                    편리하게 이용할 수 있다!

                3. 세션의 기본 유지설정시간은 20분이다.
                만약 20분동안 세션의 갱신이 없으면(웹요청이 없으면)
                이를 만료처리하여 세션을 지운다!(자동로그아웃!)

            ***************************************************************/
            );
        }
    });
});
