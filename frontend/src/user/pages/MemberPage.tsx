// ログイン情報を元に登録済みの圃場情報を取得させる個人用ページ
import ManageFarmArea from "../components/MemberPage/Farm/ManageFarm/ManageFarmArea";
function MemberPage () {

    return (
        <>
            <h1>メンバーページ</h1>
            <div>
                <ManageFarmArea />
            </div>
        </>
    )
}

export default MemberPage;