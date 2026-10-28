export default function Welcome({ totalDocentes, onNavigate }) {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body p-4">
              <h4 className="card-title">Bem-vindo</h4>
              <p className="card-text">Total de docentes: {totalDocentes}</p>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={() => onNavigate('form')}>Cadastrar Docente</button>
                <button className="btn btn-secondary" onClick={() => onNavigate('list')}>Ver Lista</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
