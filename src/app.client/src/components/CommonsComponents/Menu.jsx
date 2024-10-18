import './Menu.css'

export function Menu () {
    return(
    <>
    <div className="Menu">
        <div className="Menu-Buttons">
            <a href="/products?cate=0">📦 Productos </a>
            <hr />
            <a href="">🤝 Conócenos</a>
            <hr />
            <a href="">🤔 Ayuda</a>
        </div>
    </div>
    </>
    )
}