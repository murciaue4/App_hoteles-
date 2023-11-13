import style from "./Footer.module.css";

function Footer() {
  return (
    <div className={style.Footer}>
      <div>
        <h1>Desarrollado por:</h1>
        <p>Gerson Daniel Murcia</p>
        <p>Desarrollador web full-stack</p>
        <p>Dir: Vereda Rubiales - sector El Porvenir </p>
        <p>Whatsapp: <i>3209586890 - 3174179197</i></p>
        
      </div>
      <div>
        <h1>Desarrollado para:</h1>
        <p>Comunidad de hoteleros de Rubiales y alrededores</p>
        <p>En convenio con lupita nuestra chichuhua y mamá que patrocina el mercadito.</p>
      </div>
      <div>
        <h1>Quieres ayudar?:</h1>
        <p>Donaciones: </p>
        <p>Ahorros Bancolombia: 875 125 452 412 </p>
        <p>Nequi: 3209586890 </p>
        <p>Si quieres aportar al desarrollo escribeme: gdmp29@gmail.com</p>
      </div>
    </div>
  );
}

export default Footer;
