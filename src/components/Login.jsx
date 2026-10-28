export default function Login({ onLogin }) {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body p-4">
              <h4 className="card-title mb-4">Cadastro de Docentes</h4>
              <button className="btn btn-primary w-100" onClick={onLogin}>
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
