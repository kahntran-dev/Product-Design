<?php
/**
 * Created by PhpStorm.
 * User: KahnTran
 * Date: 7/9/2017
 * Time: 6:17 PM
 */

namespace KahnBundle\Controller;

use KahnBundle\Entity\Task;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;


class ToDoTaskController extends Controller
{
    public function newAction(Request $request)
    {
        // create a task and give it some dummy data for this example
        $task = new Task();

        $form = $this->createFormBuilder($task)
            ->add('task', TextType::class)
            ->add('dueDate', DateType::class)
            ->add('save', SubmitType::class, array('label' => 'Create Post'))
            ->getForm();

        $form->handleRequest($request);
        $temp = '';
        if ($form->isSubmitted() && $form->isValid()) {
            $temp = $task;
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated
            $task = $form->getData();

            // ... perform some action, such as saving the task to the database
            // for example, if Task is a Doctrine entity, save it!
            // $em = $this->getDoctrine()->getManager();
            // $em->persist($task);
            // $em->flush();

//            return $this->redirectToRoute('kahn_todopage', array(
//                'form' => $form->createView(),
//                'debug_temp' => $temp,
//                'debug_task' => $task,
//                'debug_request' => $request,
//            ));

            return $this->render('KahnBundle:ToDo:new.html.twig', array(
                'form' => $form->createView(),
                'debug_temp' => $temp,
                'debug_task' => $task,
                'debug_request' => $request,
            ));
        }

        return $this->render('KahnBundle:ToDo:new.html.twig', array(
            'form' => $form->createView(),
            'debug_temp' => $temp,
            'debug_task' => $task,
            'debug_request' => $request,
        ));
    }
}