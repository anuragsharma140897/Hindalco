const Additional = ({ additional }) => {
    return (
      <div className="mb-4">
        <h4 className="text-lg font-medium mb-2">Additional</h4>
        <ul>
          {Object.entries(additional).map(([key, value]) => (
            <li key={key} className="mb-1">
              <strong>{key}:</strong> {value.toString()}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Additional;
  