# TubeRush API

## Installation

```shell
  $ git clone "https://github.com/wachap/tuberush-api.git"
  $ cd "tuberush-api"
  $ npm install
```

## Usage

```shell
  $ node server.js
```

## Tests

I use `mocha` as the test runner. To run the test, simply npm install all the dependencies and run

```shell
  $ make test
```

# API DOC

## Get a single video

```
GET /videos/url
```

### Paremeters

| Name   | Type     | Description                |
|--------|:--------:|:---------------------------|
| url    | string   | The URL of youtube video.  |

#### Example

```json
{
  "url": "https://www.youtube.com/watch?v=kVbVBp35keQ"
}
```

### Response

```json
{
	"video": {
		"success": true,
		"id": "kVbVBp35keQ",
		"title": "Get started with Meteor and React",
		"links": {
			"mp4": {
				"v360p": "https://r1---sn-p5qlsnse.googlevideo.com/videoplayback?ipbits=0&dur=2230.880&sver=3&ratebypass=yes&expire=1449957451&fexp=9407155%2C9407188%2C9415327%2C9416126%2C9418182%2C9418203%2C9419446%2C9420260%2C9420452%2C9420708%2C9420770%2C9422544%2C9422596%2C9423569%2C9423662%2C9423940%2C9424223&nh=IgpwcjAxLmlhZDI2KgkxMjcuMC4wLjE&mime=video%2Fmp4&key=yt6&signature=6D5136EB09DF0638921EA8A200C456AF249B2499.92D615E71317A047A974EEC72990D898F9E79C20&lmt=1439546173695306&source=youtube&upn=MsIjWxi5Sz0&ip=54.204.172.194&requiressl=yes&mt=1449935320&mv=u&sparams=dur%2Cid%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cupn%2Cexpire&ms=au&mm=31&mn=sn-p5qlsnse&id=o-ABiJrOVduKXosmfbi3rV74fyAtIF2okY3fZJvGFDBt1V&itag=18&pl=21",
				"v480p": "https://r1---sn-p5qlsnse.googlevideo.com/videoplayback?ipbits=0&dur=2230.833&sver=3&expire=1449957451&fexp=9407155%2C9407188%2C9415327%2C9416126%2C9418182%2C9418203%2C9419446%2C9420260%2C9420452%2C9420708%2C9420770%2C9422544%2C9422596%2C9423569%2C9423662%2C9423940%2C9424223&nh=IgpwcjAxLmlhZDI2KgkxMjcuMC4wLjE&gir=yes&mime=video%2Fmp4&key=yt6&clen=24842154&signature=A8B90A08D96FE3AF9D1686161DAFDF9F470BF015.96ED3D38D72A5ED7B566FD212374144F0EA8E5B8&lmt=1439548588002035&source=youtube&upn=MsIjWxi5Sz0&keepalive=yes&ip=54.204.172.194&requiressl=yes&mt=1449935320&mv=u&sparams=clen%2Cdur%2Cgir%2Cid%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Crequiressl%2Csource%2Cupn%2Cexpire&ms=au&mm=31&mn=sn-p5qlsnse&id=o-ABiJrOVduKXosmfbi3rV74fyAtIF2okY3fZJvGFDBt1V&itag=135&pl=21&ratebypass=yes",
				"v720p": "https://r1---sn-p5qlsnse.googlevideo.com/videoplayback?ipbits=0&dur=2230.880&sver=3&ratebypass=yes&expire=1449957451&fexp=9407155%2C9407188%2C9415327%2C9416126%2C9418182%2C9418203%2C9419446%2C9420260%2C9420452%2C9420708%2C9420770%2C9422544%2C9422596%2C9423569%2C9423662%2C9423940%2C9424223&nh=IgpwcjAxLmlhZDI2KgkxMjcuMC4wLjE&mime=video%2Fmp4&key=yt6&signature=BB31F2CEDE1C07DD04D7FE074EC985A0A2FA4688.408C2120330D8A4CA1B46AEB3CC538A56DD47F76&lmt=1439546469259348&source=youtube&upn=MsIjWxi5Sz0&ip=54.204.172.194&requiressl=yes&mt=1449935320&mv=u&sparams=dur%2Cid%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cupn%2Cexpire&ms=au&mm=31&mn=sn-p5qlsnse&id=o-ABiJrOVduKXosmfbi3rV74fyAtIF2okY3fZJvGFDBt1V&itag=22&pl=21"
			},
			"mp3": {
				"a128p": "https://r1---sn-p5qlsnse.googlevideo.com/videoplayback?ipbits=0&dur=2230.880&sver=3&expire=1449957451&fexp=9407155%2C9407188%2C9415327%2C9416126%2C9418182%2C9418203%2C9419446%2C9420260%2C9420452%2C9420708%2C9420770%2C9422544%2C9422596%2C9423569%2C9423662%2C9423940%2C9424223&nh=IgpwcjAxLmlhZDI2KgkxMjcuMC4wLjE&gir=yes&mime=audio%2Fmp4&key=yt6&clen=35431569&signature=5C2C9FDF3055CAF40DE9216F3F4F2E9254E53F42.CA949EA9C2340DE1B6DB109B01C0976CB6888AD4&lmt=1439545984179279&source=youtube&upn=MsIjWxi5Sz0&keepalive=yes&ip=54.204.172.194&requiressl=yes&mt=1449935320&mv=u&sparams=clen%2Cdur%2Cgir%2Cid%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Crequiressl%2Csource%2Cupn%2Cexpire&ms=au&mm=31&mn=sn-p5qlsnse&id=o-ABiJrOVduKXosmfbi3rV74fyAtIF2okY3fZJvGFDBt1V&itag=140&pl=21&ratebypass=yes"
			}
		}
	}
}
```

