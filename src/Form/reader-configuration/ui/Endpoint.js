
const Endpoint = ({ endpoint }) => {
    return (
        <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Endpoint</h4>
            <ul>
                {Object.entries(endpoint).map(([key, value]) => (
                    <li key={key} className="mb-1">
                        <strong>{key}:</strong> {value.toString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Endpoint;
