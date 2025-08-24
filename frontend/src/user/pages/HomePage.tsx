import PagaChangeTextButton from '../../share/components/Button/PageChangeTextButton'
function HomePage () {
    return (
        <>
            <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
                <h1>学生農業団体「を」</h1>
                <p>トップページ</p>
            </div>
            <PagaChangeTextButton to="managePlant" text="作物管理ページへ" />
        </>
    )
}

export default HomePage