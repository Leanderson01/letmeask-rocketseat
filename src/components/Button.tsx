import { ButtonHTMLAttributes } from 'react';

//importando a estilização do meu componente Button
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;


export function Button(props: ButtonProps) {
  return (
    <button className="button" {...props} />
  )
}