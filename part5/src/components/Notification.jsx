
function Notification({ message }) {
  if (message === null) {
    return null
  }
  let isError = message.includes('Error')
  return (
    <div className={isError?'error':'success'}>
      {message}
    </div>
  )
}
export default Notification