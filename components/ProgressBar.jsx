const ProgressBar = ({ className, color, completed }) => {
    const containerStyles = {
      height: 20,
      width: '100%',
      backgroundColor: "transparent",
      borderRadius: 50,
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      background: color,
      borderRadius: 'inherit',
      textAlign: 'right',
      transition: 'width 1s ease-in-out',
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles} className={className}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  