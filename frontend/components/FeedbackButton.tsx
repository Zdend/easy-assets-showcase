import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button'
import { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons'

interface Props extends ButtonProps {
  feedbackIcon?: JSX.Element | boolean;
  feedback?: JSX.Element | string | boolean;
  feedbackTimeout?: number;
}

const FeedbackButton = ({ children, onClick, feedbackIcon, feedback, feedbackTimeout, ...rest}: Props) => {
  const [showFeedback, setShowFeedback] = useState(false)
  const decoratedOnClick = (e) => {
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), feedbackTimeout || 2000);
    return typeof onClick === 'function' ? onClick(e) : undefined;
  }

  const defaultFeedbackIcon = typeof feedbackIcon === 'undefined' ? <CheckOutlined /> : feedbackIcon;
  const targetFeedbackIcon = defaultFeedbackIcon !== false ? defaultFeedbackIcon : null;
  const defaultFeedback = typeof feedback === 'undefined' ? 'Done' : feedback;
  const targetFeedback = defaultFeedback !== false ? defaultFeedback : null;

  return (
    <Button {...rest} onClick={decoratedOnClick} icon={showFeedback && targetFeedbackIcon}>
      {showFeedback && targetFeedback ? targetFeedback : children}
    </Button>
  )
}

export default FeedbackButton;