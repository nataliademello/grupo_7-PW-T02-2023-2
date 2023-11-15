import { FC } from "react";

export const LoadingSpinner: FC = () => {
  return (
    <div className="screen-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}