<?php

namespace Drupal\anu_lms_assessments\Form;

use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class AssessmentQuestionResultTypeForm.
 */
class AssessmentQuestionResultTypeForm extends EntityForm {

  /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    $assessment_question_result_type = $this->entity;
    $form['label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Label'),
      '#maxlength' => 255,
      '#default_value' => $assessment_question_result_type->label(),
      '#description' => $this->t("Label for the Question result type."),
      '#required' => TRUE,
    ];

    $form['id'] = [
      '#type' => 'machine_name',
      '#default_value' => $assessment_question_result_type->id(),
      '#machine_name' => [
        'exists' => '\Drupal\anu_lms_assessments\Entity\AssessmentQuestionResultType::load',
      ],
      '#disabled' => !$assessment_question_result_type->isNew(),
    ];

    /* You will need additional form elements for your custom properties. */

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $assessment_question_result_type = $this->entity;
    $status = $assessment_question_result_type->save();

    switch ($status) {
      case SAVED_NEW:
        $this->messenger()->addMessage($this->t('Created the %label Question result type.', [
          '%label' => $assessment_question_result_type->label(),
        ]));
        break;

      default:
        $this->messenger()->addMessage($this->t('Saved the %label Question result type.', [
          '%label' => $assessment_question_result_type->label(),
        ]));
    }
    $form_state->setRedirectUrl($assessment_question_result_type->toUrl('collection'));
  }

}
