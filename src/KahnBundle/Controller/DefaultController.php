<?php

namespace KahnBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('KahnBundle:Default:index.html.twig');
    }

    public function loginAction()
    {
        return $this->render('KahnBundle:Login:login.html.twig');
    }

    public function mainPageAction(Request $request)
    {
        $data = array();
        $data['username'] = $request->request->get('uname');
        $data['password'] = $request->request->get('psw');

        if ( $data['username'] == 'khanh' && $data['password'] == 'khanh' ){
            return $this->render('KahnBundle:MainPage:mainpage.html.twig', $data);
        }
    }

    public function designProductAction()
    {
        return $this->render('KahnBundle:MainPage:indexDemoCanvas.html.twig');
    }
}
