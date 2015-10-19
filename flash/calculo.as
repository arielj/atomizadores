package Copiadeindex_fla
{
	import fl.controls.*;
	import flash.display.*;
	import flash.events.*;

	dynamic public class MainTimeline extends MovieClip
	{
		public var atom1:NumericStepper;
		public var atom2:NumericStepper;
		public var atom3:NumericStepper;
		public var atom4:NumericStepper;
		public var atom5:NumericStepper;
		public var atom6:NumericStepper;
		public var alturaAtom:*;
		public var presion:NumericStepper;
		public var ancho:NumericStepper;
		public var velocidad:NumericStepper;
		public var millas:CheckBox;
		public var labelVelo:Label;
		public var superficie:Label;
		public var cuadroSup:TextArea;
		public var alturaDes:*;
		public var des6:CheckBox;
		public var des5:CheckBox;
		public var des4:CheckBox;
		public var des3:CheckBox;
		public var des2:CheckBox;
		public var des1:CheckBox;
		public var caudal:NumericStepper;
		public var atomizadores:Array;
		public var limitados:*;
		public var array1:Array;
		public var array2:Array;
		public var array3:Array;
		public var array4:Array;
		public var array5:Array;
		public var caudales:Array;
		public var resultado:Number;
		public var mensaje:Label;
		public var cuadro:TextArea;
		public var boton:Button;
		public var ayuda:Button;
		public var cerrar:Button;

		public function MainTimeline()
		{
			super();
			addFrameScript(0, frame1, 1, frame2);
		}

		public function inicializarAtomizador(param1:NumericStepper) : void
		{
			param1.value = 3;
			param1.maximum = 5;
			param1.minimum = 1;
			param1.visible = true;
		}

		public function cambiarMillas(param1:Event) : void
		{
			if(millas.selected)
			{
				labelVelo.text = "Velocidad (M/h)";
				labelVelo.htmlText = "<b><font size=\"13\" face=\"Verdana\" color=\"#ffffffff\">Velocidad (M/h)</font></b>";
				velocidad.value = velocidad.value / 1.61;
			}
			else
			{
				labelVelo.text = "Velocidad (km/h)";
				labelVelo.htmlText = "<b><font size=\"13\" face=\"Verdana\" color=\"#ffffffff\">Velocidad (km/h)</font></b>";
				velocidad.value = velocidad.value * 1.61;
			}
		}

		public function actualizarCuenta(param1:Event) : void
		{
			var _loc_2:* = 0.00;
			var _loc_3:int = 0;
			var _loc_4:* = atomizadores;
			atom = __nextname;
			_loc_2 = _loc_2 + (caudales[atomizadores[atom].value - 1][(presion.value / 10) - 2]) * 2;
			if(!(<to complete>))
			{
				caudal.value = _loc_2 / resultado.valueOf();
			}
		}

		public function actualizarSuperficie(param1:Event) : void
		{
			var _loc_2:* = velocidad.value;
			if(millas.selected)
			{
				_loc_2 = velocidad.value * 1.61;
			}
			resultado = new Number((_loc_2 * ancho.value) / 600);
			superficie.text = resultado.toFixed(2);
		}

		public function toggleAtom(param1:Event) : void
		{
			atomizadores[param1.target.name - 1].enabled = !param1.target.selected;
			actualizarCuenta(undefined);
		}

		public function cambioPresion(param1:Event) : void
		{
			valorPresion = presion.value;
			if(valorPresion > 40)
			{
				if(limitados == false)
				{
					var _loc_2:int = 0;
					var _loc_3:* = atomizadores;
					clave = __nextname;
					atomizadores[clave].minimum = 5;
					atomizadores[clave].value = 5;
					limitados = true;
				}
			}
			else
			{
				if(limitados == true)
				{
					var _loc_2:int = 0;
					var _loc_3:* = atomizadores;
					clave = __nextname;
					atomizadores[clave].minimum = 1;
					limitados = false;
				}
			}
			actualizarCuenta(undefined);
		}

		public function caudalModificado(param1:Event) : void
		{
			var _loc_3:* = undefined;
			var _loc_4:* = undefined;
			var _loc_5:* = undefined;
			var _loc_6:int = NaN;
			var _loc_2:* = 0;
			var _loc_7:int = 0;
			var _loc_8:* = atomizadores;
			clave = __nextname;
			_loc_2 = _loc_2 + 1;
			if(!(<to complete>))
			{
				_loc_3 = false;
				_loc_4 = 5;
				var _loc_7:int = 0;
				var _loc_8:* = caudales;
				tamanio = __nextname;
				for each(_loc_5 in _loc_8)
				{
					_loc_6 = caudal.value * resultado.valueOf();
					if(_loc_5 >= _loc_6 && _loc_3 == false)
					{
						_loc_3 = true;
						_loc_4 = tamanio;
					}
				}
				atom1.value = _loc_4;
				atom2.value = _loc_4;
				atom3.value = _loc_4;
				atom4.value = _loc_4;
				atom5.value = _loc_4;
				atom6.value = _loc_4;
				if(!_loc_3)
				{
					mostrarCuadroPresionBaja(undefined);
					actualizarCuenta(undefined);
				}
			}
		}

		public function mostrarCuadroPresionBaja(param1:Event) : void
		{
			cuadro.visible = true;
			mensaje.visible = true;
			boton.visible = true;
		}

		public function ocultarCuadroPresionBaja(param1:Event) : void
		{
			cuadro.visible = false;
			mensaje.visible = false;
			boton.visible = false;
		}

		public function mostrarAyuda(param1:Event) : void
		{
			gotoAndPlay(2);
			ocultarTodo();
		}

		public function cerrarAyuda(param1:Event) : void
		{
			cerrar.visible = false;
			gotoAndPlay(1);
		}

		public function frame1()
		{
			atom1 = new NumericStepper();
			atom2 = new NumericStepper();
			atom3 = new NumericStepper();
			atom4 = new NumericStepper();
			atom5 = new NumericStepper();
			atom6 = new NumericStepper();
			alturaAtom = 200;
			atom1.x = 564.50;
			atom1.y = alturaAtom;
			atom2.x = 465.40;
			atom2.y = alturaAtom;
			atom3.x = 361.60;
			atom3.y = alturaAtom;
			atom4.x = 256.40;
			atom4.y = alturaAtom;
			atom5.x = 149.30;
			atom5.y = alturaAtom;
			atom6.x = 46;
			atom6.y = alturaAtom;
			atom5.enabled = false;
			atom6.enabled = false;
			inicializarAtomizador(atom1);
			inicializarAtomizador(atom2);
			inicializarAtomizador(atom3);
			inicializarAtomizador(atom4);
			inicializarAtomizador(atom5);
			inicializarAtomizador(atom6);
			addChild(atom1);
			addChild(atom2);
			addChild(atom3);
			addChild(atom4);
			addChild(atom5);
			addChild(atom6);
			presion = new NumericStepper();
			presion.maximum = 60;
			presion.value = 30;
			presion.minimum = 20;
			presion.stepSize = 10;
			presion.x = 46;
			presion.y = 334;
			presion.visible = true;
			addChild(presion);
			ancho = new NumericStepper();
			ancho.maximum = 30;
			ancho.value = 20;
			ancho.minimum = 10;
			ancho.x = 46;
			ancho.y = 105.30;
			ancho.visible = true;
			addChild(ancho);
			velocidad = new NumericStepper();
			velocidad.maximum = 300;
			velocidad.value = 190;
			velocidad.minimum = 80;
			velocidad.x = 161.90;
			velocidad.y = 105.30;
			velocidad.visible = true;
			addChild(velocidad);
			millas = new CheckBox();
			millas.label = "millas/h";
			millas.x = 159.30;
			millas.y = 131.30;
			addChild(millas);
			millas.addEventListener(MouseEvent.CLICK, cambiarMillas);
			labelVelo = new Label();
			labelVelo.htmlText = "<b><font size=\"13\" face=\"Verdana\" color=\"#ffffffff\">Velocidad (km/h)</font></b>";
			labelVelo.text = "Velocidad (km/h)";
			labelVelo.x = 140;
			labelVelo.y = 83;
			labelVelo.width = 150;
			labelVelo.visible = true;
			addChild(labelVelo);
			superficie = new Label();
			superficie.x = 357;
			superficie.y = 106;
			superficie.autoSize = "center";
			superficie.width = 40;
			superficie.height = 22;
			superficie.text = "6.30";
			superficie.visible = true;
			cuadroSup = new TextArea();
			cuadroSup.x = 359;
			cuadroSup.y = 102;
			cuadroSup.width = 36;
			cuadroSup.height = 28;
			cuadroSup.visible = true;
			cuadroSup.editable = false;
			addChild(cuadroSup);
			addChild(superficie);
			alturaDes = 233;
			des6 = new CheckBox();
			des6.x = 41;
			des6.y = alturaDes;
			des6.selected = true;
			des6.label = "Deshabilitar";
			des6.name = "6";
			des5 = new CheckBox();
			des5.x = 144.30;
			des5.y = alturaDes;
			des5.selected = true;
			des5.label = "Deshabilitar";
			des5.name = "5";
			des4 = new CheckBox();
			des4.x = 251.40;
			des4.y = alturaDes;
			des4.label = "Deshabilitar";
			des4.name = "4";
			des3 = new CheckBox();
			des3.x = 357.40;
			des3.y = alturaDes;
			des3.label = "Deshabilitar";
			des3.name = "3";
			des2 = new CheckBox();
			des2.x = 460.40;
			des2.y = alturaDes;
			des2.label = "Deshabilitar";
			des2.name = "2";
			des1 = new CheckBox();
			des1.x = 559.50;
			des1.y = alturaDes;
			des1.label = "Deshabilitar";
			des1.name = "1";
			addChild(des1);
			addChild(des2);
			addChild(des3);
			addChild(des4);
			addChild(des5);
			addChild(des6);
			caudal = new NumericStepper();
			caudal.x = 160;
			caudal.y = 334;
			caudal.maximum = 100;
			caudal.minimum = 1;
			caudal.value = 10;
			caudal.visible = true;
			addChild(caudal);
			atomizadores = new Array(atom1, atom2, atom3, atom4, atom5, atom6);
			limitados = false;
			array1 = new Array(0.37, 0.69, 1);
			array2 = new Array(1.30, 2.27, 2.80);
			array3 = new Array(2.72, 4.54, 6.20);
			array4 = new Array(4.37, 7.69, 9.75);
			array5 = new Array(6.10, 11.23, 14.30, 17.75, 20.30);
			caudales = new Array(array1, array2, array3, array4, array5);
			resultado = Number(6.30);
			atom1.addEventListener(Event.CHANGE, actualizarCuenta);
			atom2.addEventListener(Event.CHANGE, actualizarCuenta);
			atom3.addEventListener(Event.CHANGE, actualizarCuenta);
			atom4.addEventListener(Event.CHANGE, actualizarCuenta);
			atom5.addEventListener(Event.CHANGE, actualizarCuenta);
			ancho.addEventListener(Event.CHANGE, actualizarSuperficie);
			velocidad.addEventListener(Event.CHANGE, actualizarSuperficie);
			des6.addEventListener(MouseEvent.CLICK, toggleAtom);
			des5.addEventListener(MouseEvent.CLICK, toggleAtom);
			des4.addEventListener(MouseEvent.CLICK, toggleAtom);
			des3.addEventListener(MouseEvent.CLICK, toggleAtom);
			des2.addEventListener(MouseEvent.CLICK, toggleAtom);
			des1.addEventListener(MouseEvent.CLICK, toggleAtom);
			presion.addEventListener(MouseEvent.CLICK, cambioPresion);
			caudal.addEventListener(MouseEvent.CLICK, caudalModificado);
			ancho.addEventListener(MouseEvent.CLICK, caudalModificado);
			velocidad.addEventListener(MouseEvent.CLICK, caudalModificado);
			mensaje = new Label();
			mensaje.text = "El caudal no se puede obtener con esta presion.";
			mensaje.x = 260.80;
			mensaje.y = 264.60;
			mensaje.width = 240;
			mensaje.height = 23;
			mensaje.visible = false;
			cuadro = new TextArea();
			cuadro.x = 209.20;
			cuadro.y = 236.60;
			cuadro.width = 331;
			cuadro.height = 101;
			cuadro.visible = false;
			boton = new Button();
			boton.x = 325.30;
			boton.y = 300.40;
			boton.width = 100;
			boton.height = 23;
			boton.visible = false;
			boton.label = "Aceptar";
			addChild(cuadro);
			addChild(mensaje);
			addChild(boton);
			boton.addEventListener(MouseEvent.CLICK, ocultarCuadroPresionBaja);
			ayuda = new Button();
			ayuda.label = "Ayuda (?)";
			ayuda.x = 500;
			ayuda.y = 440;
			ayuda.addEventListener(MouseEvent.CLICK, mostrarAyuda);
			stop();
		}

		public function frame2()
		{
			cerrar = new Button();
			cerrar.label = "Cerrar ayuda";
			cerrar.x = 346;
			cerrar.y = 432;
			cerrar.visible = true;
			addChild(cerrar);
			cerrar.addEventListener(MouseEvent.CLICK, cerrarAyuda);
			stop();
		}
	}
}
