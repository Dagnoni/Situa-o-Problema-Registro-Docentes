export default function ListDocentes({ docentes, onEdit, onDelete }) {
  return (
    <div className="container mt-4">
      {docentes.length === 0 ? (
        <div className="alert alert-info">Nenhum docente cadastrado.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Nome</th>
                <th>Formacao</th>
                <th>Email</th>
                <th className="text-center" style={{ width: '200px' }}>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {docentes.map((d) => (
                <tr key={d.id}>
                  <td>{d.nome}</td>
                  <td>{d.formacao}</td>
                  <td>{d.emailInst}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(d)}>Alterar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => { if (window.confirm(`Remover ${d.nome}?`)) onDelete(d.id); }}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
