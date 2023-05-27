const Notification = ({ message, notifyType }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={notifyType}>
        {message}
      </div>
    )
  }

export default Notification