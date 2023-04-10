export const Square = ({ children, isSelected, updateBoard, index, isWinner}) => {
    const className = `square ${isSelected ? 'is-selected' : '' || isWinner ? 'is-winner' : ''}`
    const handleClick = () => {
      updateBoard(index);
    }
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
}