import PagaChangeTextButton from '../../share/components/Button/PageChangeTextButton'
function HomePage () {
    return (
        <>
            <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
                <h1>学生農業団体「を」</h1>
                <p>トップページ</p>
            </div>
            <PagaChangeTextButton to="/login" text="ログイン" />
        </>
    )
}

export default HomePage