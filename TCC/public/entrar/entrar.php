<?php
   $conexao = mysqli_connect("localhost","root","","tccSA");

   $nome  = $_POST["nome"];
   $email = $_POST["email"]; 
   $senha = $_POST["senha"];
   $tipo  = $_POST["tipo_conta"];

   $salvar = mysqli_query($conexao,"insert into tb_usuarios VALUES (null, '$nome', '$email', '$senha', '$tipo')");
   //Código que envia o email
   

   if ($salvar){
    echo "<script>alert('Usuario cadastrado com sucesso')</script>";
    echo '<meta http-equiv="refresh" content="0; url=cadastro.html">';
 } else{
   echo "ERRO AO TENTAR SALVAR";
 }

?>