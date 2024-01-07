export function Input(props) {

const {id,label,error,onChange,type} = props;



/* <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                className={ errors.username ? "form-control is-invalid" : "form-control" }
                onChange={(event) => setUsername(event.target.value)}
              />
              <div>{errors.username}</div>
            </div> */

            //Burada aslında daha temiz kod ve bağımlılığı azaltılması için component kullanıyoruz.
            //Username yerine id , label olarak da Username tanımlaması yapıyoruz.errors.username yerine
            //error tanımlayabiliriz ve yine aynı hata gelir,çünkü gerek index.jsx de gerekli UseState tanımlamaları yapıldı.
            //Java Programında da gerekli tanımlamalar yapılmıştır.
    
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        className={error ? "form-control is-invalid" : "form-control"}
        onChange={onChange}
        type = {type}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}
